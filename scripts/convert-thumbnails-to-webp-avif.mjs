import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const thumbnailsDir = path.join(publicDir, "images", "thumbnails");

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const collectThumbnails = async () => {
  const items = new Set();

  try {
    const entries = await fs.readdir(thumbnailsDir);
    for (const entry of entries) {
      items.add(path.join(thumbnailsDir, entry));
    }
  } catch {
    // ignore missing thumbnails dir
  }

  const walk = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (/thumbnail/i.test(entry.name)) {
        items.add(fullPath);
      }
    }
  };

  await walk(publicDir);

  return [...items];
};

const run = async () => {
  const files = await collectThumbnails();
  if (files.length === 0) {
    console.log("No thumbnails found.");
    return;
  }

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = file.slice(0, -ext.length);
    const webpPath = `${base}.webp`;
    const avifPath = `${base}.avif`;

    const image = sharp(file);

    if (ext !== ".webp") {
      await image.clone().webp({ quality: 80, effort: 6 }).toFile(webpPath);
    } else if (!(await exists(webpPath))) {
      await image.clone().toFile(webpPath);
    }

    if (!(await exists(avifPath))) {
      await image.clone().avif({ quality: 50, effort: 6 }).toFile(avifPath);
    }
  }

  console.log(`Processed ${files.length} thumbnail(s).`);
};

await run();
