import sharp from "sharp";
import fs from "fs";
import path from "path";

const projectRoot = process.cwd();

async function optimizeImages() {
  const images = [
    { input: "image-input/talkling-hero.png", output: "public/images/talkling/hero.webp", project: "talkling" },
    { input: "image-input/lighthousecph-hero.png", output: "public/images/lighthousecph/hero.webp", project: "lighthousecph" },
  ];

  for (const img of images) {
    const inputPath = path.join(projectRoot, img.input);
    const outputPath = path.join(projectRoot, img.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⊘ ${img.project}: input file not found (${inputPath})`);
      continue;
    }

    const metadata = await sharp(inputPath).metadata();
    const inputSize = fs.statSync(inputPath).size / 1024 / 1024;
    console.log(`Processing ${img.project}: ${metadata.width}x${metadata.height} (${inputSize.toFixed(1)}MB)`);

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const result = await sharp(inputPath)
      .resize(1200, 620, { fit: "cover", position: "center" })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const outSize = result.size / 1024;
    console.log(`  ✓ ${result.width}x${result.height} WebP - ${outSize.toFixed(1)}KB (${((inputSize * 1024 - outSize) / (inputSize * 1024) * 100).toFixed(0)}% reduction)`);
  }
}

optimizeImages().catch(console.error);
