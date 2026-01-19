import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const projectRoot = process.cwd();

const sourceSvgPath = path.join(projectRoot, "src", "app", "icon.svg");
const outPublicSvgPath = path.join(projectRoot, "public", "icon.svg");
const outIcoPath = path.join(projectRoot, "src", "app", "favicon.ico");

const sizes = [16, 32, 48, 64];

const svg = await fs.readFile(sourceSvgPath);

// Keep the runtime-served SVG in sync with the app icon source.
await fs.writeFile(outPublicSvgPath, svg);

const pngBuffers = await Promise.all(
  sizes.map(async (size) =>
    sharp(svg, { density: 512 })
      .resize(size, size)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer(),
  ),
);

const ico = await pngToIco(pngBuffers);
await fs.writeFile(outIcoPath, ico);

console.log(
  `Wrote ${path.relative(projectRoot, outIcoPath)} and ${path.relative(projectRoot, outPublicSvgPath)} from ${path.relative(projectRoot, sourceSvgPath)} (${sizes.join(", ")}px)`
);
