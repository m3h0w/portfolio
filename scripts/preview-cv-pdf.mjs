import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = {
    lang: "en",
    host: "localhost",
    port: 3006,
    inline: true,
    open: true,
    start: true,
    out: null,
    keepAlive: false,
    timeoutMs: 90_000,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    const next = argv[i + 1];

    // Allow pnpm-style arg separator.
    if (a === "--") {
      continue;
    }

    if (a === "--lang" && next) {
      args.lang = next === "pl" ? "pl" : "en";
      i += 1;
      continue;
    }

    if (a === "--host" && next) {
      args.host = next;
      i += 1;
      continue;
    }

    if (a === "--port" && next) {
      const p = Number(next);
      if (!Number.isFinite(p) || p <= 0) throw new Error(`Invalid --port: ${next}`);
      args.port = p;
      i += 1;
      continue;
    }

    if (a === "--inline") {
      args.inline = true;
      continue;
    }

    if (a === "--no-inline") {
      args.inline = false;
      continue;
    }

    if (a === "--open") {
      args.open = true;
      continue;
    }

    if (a === "--no-open") {
      args.open = false;
      continue;
    }

    if (a === "--start") {
      args.start = true;
      continue;
    }

    if (a === "--no-start") {
      args.start = false;
      continue;
    }

    if (a === "--out" && next) {
      args.out = next;
      i += 1;
      continue;
    }

    if (a === "--keep-alive") {
      args.keepAlive = true;
      continue;
    }

    if (a === "--no-keep-alive") {
      args.keepAlive = false;
      continue;
    }

    if (a === "--timeout" && next) {
      const ms = Number(next);
      if (!Number.isFinite(ms) || ms <= 0) throw new Error(`Invalid --timeout: ${next}`);
      args.timeoutMs = ms;
      i += 1;
      continue;
    }

    if (a === "--help" || a === "-h") {
      printHelpAndExit(0);
    }

    throw new Error(`Unknown arg: ${a}`);
  }

  return args;
}

function printHelpAndExit(code) {
  // Keep this short; it’s a dev helper.
  console.log(`Usage: pnpm cv:pdf:preview [options]

Options:
  --lang en|pl        Language (default: en)
  --port <number>     Port (default: 3006)
  --host <string>     Host (default: localhost)
  --[no-]inline       Use Content-Disposition inline (default: inline)
  --[no-]open         Open the PDF URL in a browser (default: open)
  --[no-]start        Start Next dev server if needed (default: start)
  --out <path>        Save PDF to a file (optional)
  --[no-]keep-alive   Keep dev server running if started (default: no)
  --timeout <ms>      Max wait for server/PDF (default: 90000)
`);
  process.exit(code);
}

function buildPdfUrl({ host, port, lang, inline }) {
  const url = new URL(`http://${host}:${port}/api/cv-pdf`);
  url.searchParams.set("lang", lang);
  if (inline) url.searchParams.set("inline", "1");
  return url.toString();
}

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function waitForPdf(url, timeoutMs) {
  const startedAt = Date.now();
  let lastErr = null;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("application/pdf")) {
        throw new Error(`Unexpected content-type: ${ct || "(none)"}`);
      }

      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1000) throw new Error(`PDF too small (${buf.length} bytes)`);
      return buf;
    } catch (e) {
      lastErr = e;
      await sleep(750);
    }
  }

  throw new Error(`Timed out waiting for PDF (${timeoutMs}ms). Last error: ${lastErr?.message || lastErr}`);
}

async function tryFetchPdf(url) {
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/pdf")) {
    throw new Error(`Unexpected content-type: ${ct || "(none)"}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`PDF too small (${buf.length} bytes)`);
  return buf;
}

function spawnDevServer(port) {
  const pnpmArgs = ["-s", "exec", "next", "dev", "-p", String(port)];
  const child = spawn("pnpm", pnpmArgs, {
    stdio: "inherit",
    env: process.env,
  });

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`\nNext dev server exited with code ${code}`);
    }
  });

  return child;
}

async function openExternal(url) {
  const platform = process.platform;

  if (platform === "darwin") {
    await new Promise((resolve, reject) => {
      const p = spawn("open", [url], { stdio: "ignore" });
      p.on("error", reject);
      p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`open exited ${code}`))));
    });
    return;
  }

  if (platform === "win32") {
    await new Promise((resolve, reject) => {
      const p = spawn("cmd", ["/c", "start", "", url], { stdio: "ignore" });
      p.on("error", reject);
      p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`start exited ${code}`))));
    });
    return;
  }

  await new Promise((resolve, reject) => {
    const p = spawn("xdg-open", [url], { stdio: "ignore" });
    p.on("error", reject);
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`xdg-open exited ${code}`))));
  });
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function main() {
  const args = parseArgs(process.argv);

  const url = buildPdfUrl(args);
  const defaultOut = `.tmp/cv-${args.lang}.pdf`;
  const outArg = args.out || defaultOut;

  let serverProcess = null;
  let pdfBuffer = null;

  // Prefer attaching to an existing dev server to avoid port conflicts.
  try {
    pdfBuffer = await tryFetchPdf(url);
  } catch {
    if (args.start) {
      serverProcess = spawnDevServer(args.port);
    }
    pdfBuffer = await waitForPdf(url, args.timeoutMs);
  }

  const outPath = path.isAbsolute(outArg) ? outArg : path.join(process.cwd(), outArg);

  await ensureDir(outPath);
  await fs.writeFile(outPath, pdfBuffer);
  console.log(`Saved: ${outPath}`);

  console.log(`PDF URL: ${url}`);

  if (args.open) {
    // Open the saved PDF file to avoid “downloads” in the browser.
    await openExternal(outPath);
  }

  if (serverProcess && args.keepAlive) {
    console.log("Dev server running. Press Ctrl+C to stop.");
    await new Promise(() => {});
  }

  if (serverProcess && !args.keepAlive) {
    serverProcess.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
