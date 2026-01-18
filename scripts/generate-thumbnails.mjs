import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const REPO_ROOT = process.cwd();
const ITEMS_DIR = path.join(REPO_ROOT, "src", "data", "portfolio", "items");
const PUBLIC_DIR = path.join(REPO_ROOT, "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "images", "thumbnails");

const MAX_WIDTH = 900; // enough for ~400px cards on 2x screens
const WEBP_QUALITY = 82;

function toOutputWebPath(thumbnailWebPath) {
  // thumbnailWebPath is like /images/foo/bar.png
  const rel = thumbnailWebPath.replace(/^\/images\//, "");
  const parsed = path.parse(rel);
  const safeBase = path.join(parsed.dir, parsed.name).replaceAll(path.sep, "__");
  return `/images/thumbnails/${safeBase}.webp`;
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const entries = await fs.readdir(ITEMS_DIR);
  const itemFiles = entries
    .filter((name) => name.endsWith(".js"))
    .map((name) => path.join(ITEMS_DIR, name));

  const thumbnails = new Set();

  for (const filePath of itemFiles) {
    const src = await fs.readFile(filePath, "utf8");
    const regex = /thumbnail:\s*"(\/images\/[^\"]+)"/g;
    let match;
    while ((match = regex.exec(src))) {
      thumbnails.add(match[1]);
    }
  }

  const list = [...thumbnails].sort();

  if (list.length === 0) {
    console.log("No thumbnails found.");
    return;
  }

  console.log(`Found ${list.length} thumbnail(s).`);

  const results = [];

  for (const webPath of list) {
    const inDisk = path.join(PUBLIC_DIR, webPath);
    const outWeb = toOutputWebPath(webPath);
    const outDisk = path.join(PUBLIC_DIR, outWeb);

    try {
      await fs.access(inDisk);
    } catch {
      console.warn(`Skipping (missing): ${webPath}`);
      continue;
    }

    await fs.mkdir(path.dirname(outDisk), { recursive: true });

    const image = sharp(inDisk, { failOn: "none" });
    const meta = await image.metadata();

    const resized = image.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    });

    await resized.webp({ quality: WEBP_QUALITY }).toFile(outDisk);

    results.push({ from: webPath, to: outWeb, width: meta.width, height: meta.height });
  }

  console.log("Generated thumbnails:");
  for (const r of results) {
    console.log(`- ${r.from} -> ${r.to}`);
  }
}

await main();
