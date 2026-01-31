import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.join(process.cwd(), "public", "images", "soilsense");
const inName = "soilsense-long-screenshot.png";
const inPath = path.join(dir, inName);

const fmt = (n) =>
  n < 1024
    ? `${n} B`
    : n < 1024 * 1024
      ? `${(n / 1024).toFixed(1)} KB`
      : `${(n / 1024 / 1024).toFixed(2)} MB`;

const inputBuf = await fs.readFile(inPath);
const inputMeta = await sharp(inputBuf, { limitInputPixels: false }).metadata();

console.log(
  `INPUT: ${inName} | ${inputMeta.width}x${inputMeta.height} | ${fmt(inputBuf.byteLength)} | alpha=${inputMeta.hasAlpha}`,
);

const WIDTH = 1000;
const base = sharp(inputBuf, { limitInputPixels: false }).resize({ width: WIDTH });
const resizedMeta = await base.clone().metadata();
console.log(`RESIZED: width=${WIDTH} -> ${resizedMeta.width}x${resizedMeta.height}`);

const variants = [];

variants.push({
  out: `soilsense-long-screenshot.w${WIDTH}.lossless.png`,
  pipeline: (img) => img.png({ compressionLevel: 9, adaptiveFiltering: true }),
});

variants.push({
  out: `soilsense-long-screenshot.w${WIDTH}.palette256.png`,
  pipeline: (img) =>
    img.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      colours: 256,
      dither: 0.5,
    }),
});

variants.push({
  out: `soilsense-long-screenshot.w${WIDTH}.webp-q80.webp`,
  pipeline: (img) => img.webp({ quality: 80, effort: 6 }),
});

variants.push({
  out: `soilsense-long-screenshot.w${WIDTH}.avif-q50.avif`,
  pipeline: (img) => img.avif({ quality: 50, effort: 6 }),
});

variants.push({
  out: `soilsense-long-screenshot.w${WIDTH}.avif-q70.avif`,
  pipeline: (img) => img.avif({ quality: 70, effort: 6 }),
});

if (inputMeta.hasAlpha) {
  variants.push({
    out: `soilsense-long-screenshot.w${WIDTH}.opaque.lossless.png`,
    pipeline: (img) =>
      img.removeAlpha().png({ compressionLevel: 9, adaptiveFiltering: true }),
  });

  variants.push({
    out: `soilsense-long-screenshot.w${WIDTH}.opaque.webp-q80.webp`,
    pipeline: (img) => img.removeAlpha().webp({ quality: 80, effort: 6 }),
  });

  variants.push({
    out: `soilsense-long-screenshot.w${WIDTH}.opaque.avif-q50.avif`,
    pipeline: (img) => img.removeAlpha().avif({ quality: 50, effort: 6 }),
  });

  variants.push({
    out: `soilsense-long-screenshot.w${WIDTH}.opaque.avif-q70.avif`,
    pipeline: (img) => img.removeAlpha().avif({ quality: 70, effort: 6 }),
  });
}

for (const v of variants) {
  const outPath = path.join(dir, v.out);
  const outBuf = await v.pipeline(base.clone()).toBuffer();
  await fs.writeFile(outPath, outBuf);

  const outMeta = await sharp(outBuf, { limitInputPixels: false }).metadata();
  const saved = inputBuf.byteLength - outBuf.byteLength;
  const savedPct = (saved / inputBuf.byteLength) * 100;

  console.log(`\n${v.out}`);
  console.log(
    `- size: ${fmt(outBuf.byteLength)} (saved ${fmt(saved)} / ${savedPct.toFixed(1)}% vs original)`,
  );
  console.log(
    `- format: ${outMeta.format} | ${outMeta.width}x${outMeta.height} | alpha=${outMeta.hasAlpha}`,
  );
}
