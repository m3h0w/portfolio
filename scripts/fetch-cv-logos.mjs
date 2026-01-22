import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  return {
    force: args.has("--force"),
    verbose: args.has("--verbose"),
  };
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadToFile(url, outFile) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url} (${res.status} ${res.statusText})`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(outFile, buffer);
}

async function main() {
  const { force, verbose } = parseArgs(process.argv);

  const configPath = path.join(__dirname, "cv-logos.json");
  const configRaw = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(configRaw);

  const repoRoot = path.resolve(__dirname, "..");
  const outputDir = path.resolve(repoRoot, config.outputDir);
  await ensureDir(outputDir);

  for (const item of config.logos) {
    const outFile = path.join(outputDir, item.filename);
    if (!force && (await fileExists(outFile))) {
      continue;
    }

    await downloadToFile(item.url, outFile);
    if (verbose) {
      // Keep logs short; no URLs/base64 printed.
      console.log(`Downloaded ${item.filename}`);
    }
  }

  // GoBundl (base64 file, no network)
  const gobundlBase64Path = path.resolve(repoRoot, config.gobundlBase64File);
  const gobundlOutFile = path.join(outputDir, config.gobundlFilename);

  if (force || !(await fileExists(gobundlOutFile))) {
    const b64 = (await fs.readFile(gobundlBase64Path, "utf8")).trim();
    const buffer = Buffer.from(b64, "base64");
    await fs.writeFile(gobundlOutFile, buffer);
    if (verbose) {
      console.log(`Wrote ${config.gobundlFilename}`);
    }
  }
}

await main();
