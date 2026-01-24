import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const REPO_ROOT = process.cwd();
const INPUT_DIR = path.join(REPO_ROOT, "image-input");
const OUTPUT_DIR = path.join(REPO_ROOT, "public", "images", "cbs-students");
const THUMB_DIR = path.join(REPO_ROOT, "public", "images", "thumbnails");

const SOURCES = [
  "67d17b27e7593885255aab1d_626fe21c12eec9cb19ef45e7_01.webp",
  "67d17b27e7593885255aab2e_626fe21cbf12a474e9e370e3_03.webp",
  "67d17b27e7593885255aab3c_626fe21b4908f4f4a20adbee_05.webp",
];

const OUT_NAMES = ["screen-01.webp", "screen-02.webp", "screen-03.webp"];

const THUMB_WIDTH = 1200;
const THUMB_HEIGHT = 630;
const COL_WIDTH = Math.floor(THUMB_WIDTH / 3);

async function ensureDirs() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(THUMB_DIR, { recursive: true });
}

async function copyInputs() {
  await Promise.all(
    SOURCES.map((file, idx) =>
      fs.copyFile(
        path.join(INPUT_DIR, file),
        path.join(OUTPUT_DIR, OUT_NAMES[idx])
      )
    )
  );
}

async function buildThumbnail() {
  const resized = await Promise.all(
    SOURCES.map(async (file) => {
      const inputPath = path.join(INPUT_DIR, file);
      return sharp(inputPath)
        .resize(COL_WIDTH, THUMB_HEIGHT, { fit: "cover", position: "entropy" })
        .toBuffer();
    })
  );

  const composite = resized.map((buffer, idx) => ({
    input: buffer,
    top: 0,
    left: idx * COL_WIDTH,
  }));

  const canvas = sharp({
    create: {
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
      channels: 3,
      background: "#ffffff",
    },
  });

  const outPath = path.join(THUMB_DIR, "cbs-students.webp");
  await canvas
    .composite(composite)
    .webp({ quality: 82 })
    .toFile(outPath);
}

await ensureDirs();
await copyInputs();
await buildThumbnail();

console.log("CBS Students thumbnail generated.");
