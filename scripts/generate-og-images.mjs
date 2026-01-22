import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const OUTPUT_DIR = path.join(rootDir, "public", "og");
const PROJECTS_DIR = path.join(OUTPUT_DIR, "projects");
const PUBLIC_DIR = path.join(rootDir, "public");

const SIZE = { width: 1200, height: 630 };
const locales = ["en", "pl"];

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function ogSvg({ title, subtitle, kicker }) {
  const safeTitle = escapeXml(title);
  const safeSubtitle = escapeXml(subtitle || "");
  const safeKicker = escapeXml(kicker || "");

  const wrapText = (text, maxCharsPerLine, maxLines) => {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";

    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > maxCharsPerLine && current) {
        lines.push(current);
        current = word;
        if (lines.length >= maxLines) break;
      } else {
        current = next;
      }
    }

    if (lines.length < maxLines && current) lines.push(current);

    if (lines.length > maxLines) return lines.slice(0, maxLines);
    return lines;
  };

  const titleLines = wrapText(safeTitle, 24, 2);
  const subtitleLines = wrapText(safeSubtitle, 40, 2);
  const titleFontSize = titleLines.some((line) => line.length > 20) ? 52 : 56;
  const subtitleFontSize = subtitleLines.some((line) => line.length > 36) ? 26 : 30;
  const titleStartY = 250;
  const titleLineHeight = 70;
  const subtitleStartY = titleStartY + titleLines.length * titleLineHeight + 12;
  const subtitleLineHeight = 36;

  const glassesIcon = `
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#1f2937" stroke-linecap="round" stroke-linejoin="round" stroke-width="5">
        <circle cx="18" cy="34" r="9" />
        <circle cx="46" cy="34" r="9" />
        <path d="M30 33C31 29 33 29 34 33" />
        <path d="M8 34L3 29" />
        <path d="M56 34l5-4" />
      </g>
    </svg>
  `;

  return `
<svg width="${SIZE.width}" height="${SIZE.height}" viewBox="0 0 ${SIZE.width} ${SIZE.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6d28d9" />
      <stop offset="100%" stop-color="#9333ea" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect x="72" y="72" width="1056" height="486" rx="36" fill="#ffffff" stroke="#e2e8f0" />
  <rect x="96" y="96" width="24" height="438" rx="12" fill="url(#accent)" />

  ${safeKicker ? `<g transform="translate(144 120)">${glassesIcon}</g>` : ""}
  <text x="144" y="190" font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="24" fill="#64748b" letter-spacing="0.06em">${safeKicker}</text>
  <text x="144" y="${titleStartY}" font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${titleFontSize}" font-weight="700" fill="#0f172a">
    ${titleLines
      .map((line, index) => `<tspan x="144" dy="${index === 0 ? 0 : titleLineHeight}">${line}</tspan>`)
      .join("\n    ")}
  </text>
  <text x="144" y="${subtitleStartY}" font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="${subtitleFontSize}" fill="#334155">
    ${subtitleLines
      .map((line, index) => `<tspan x="144" dy="${index === 0 ? 0 : subtitleLineHeight}">${line}</tspan>`)
      .join("\n    ")}
  </text>

  <text x="144" y="520" font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="24" fill="#475569">michalgacka.com</text>
</svg>
`;
}

async function renderOg({ filename, title, subtitle, kicker, imagePath }) {
  const svg = ogSvg({ title, subtitle, kicker });
  const outputPath = path.join(OUTPUT_DIR, filename);

  if (imagePath) {
    const absoluteImagePath = path.join(PUBLIC_DIR, imagePath.replace(/^\//, ""));
    const imageSize = 280;
    const cornerRadius = 36;
    
    // Create rounded corner mask for top-right
    const roundedCornerSvg = `
      <svg width="${imageSize}" height="${imageSize}">
        <rect x="0" y="0" width="${imageSize}" height="${imageSize}" rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
      </svg>
    `;

    const imageBuffer = await sharp(absoluteImagePath)
      .resize(imageSize, imageSize, { fit: "cover" })
      .composite([
        {
          input: Buffer.from(roundedCornerSvg),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();

    await sharp(Buffer.from(svg))
      .resize(SIZE.width, SIZE.height)
      .composite([
        {
          input: imageBuffer,
          top: 96,
          left: 820,
          blend: "over",
        },
      ])
      .png()
      .toFile(outputPath);
    return;
  }

  await sharp(Buffer.from(svg))
    .resize(SIZE.width, SIZE.height)
    .png()
    .toFile(outputPath);
}

async function renderProjectOg({ locale, slug, title, subtitle, thumbnailPath }) {
  const kicker = locale === "pl" ? "Projekt" : "Project";
  const svg = ogSvg({ title, subtitle, kicker });
  const outputPath = path.join(PROJECTS_DIR, `${slug}-${locale}.png`);

  if (thumbnailPath) {
    const absoluteThumbPath = path.join(PUBLIC_DIR, thumbnailPath.replace(/^\//, ""));
    const imageSize = 280;
    const cornerRadius = 36;
    
    // Create rounded corner mask for top-right
    const roundedCornerSvg = `
      <svg width="${imageSize}" height="${imageSize}">
        <rect x="0" y="0" width="${imageSize}" height="${imageSize}" rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
      </svg>
    `;

    const thumbBuffer = await sharp(absoluteThumbPath)
      .resize(imageSize, imageSize, { fit: "cover" })
      .composite([
        {
          input: Buffer.from(roundedCornerSvg),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();

    await sharp(Buffer.from(svg))
      .resize(SIZE.width, SIZE.height)
      .composite([
        {
          input: thumbBuffer,
          top: 96,
          left: 820,
          blend: "over",
        },
      ])
      .png()
      .toFile(outputPath);
    return;
  }

  await sharp(Buffer.from(svg)).resize(SIZE.width, SIZE.height).png().toFile(outputPath);
}

async function ensureDirs() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(PROJECTS_DIR, { recursive: true });
}

function extractValue(block, key) {
  if (!block) return "";
  const match = block.match(new RegExp(`${key}\\s*:\\s*[\"']([^\"']+)[\"']`));
  return match ? match[1].trim() : "";
}

function extractLocaleBlock(content, locale) {
  const localeIndex = content.indexOf(`${locale}:`);
  if (localeIndex === -1) return "";

  const otherLocale = locale === "en" ? "pl:" : "en:";
  const nextIndex = content.indexOf(otherLocale, localeIndex + 3);
  return content.slice(localeIndex, nextIndex === -1 ? undefined : nextIndex);
}

async function getProjectData() {
  const itemsDir = path.join(rootDir, "src", "data", "portfolio", "items");
  const files = (await fs.readdir(itemsDir)).filter((file) => file.endsWith(".js"));
  const projects = [];

  for (const file of files) {
    const filePath = path.join(itemsDir, file);
    const content = await fs.readFile(filePath, "utf-8");
    const slugMatch = content.match(/slug:\s*[\"']([^\"']+)[\"']/);
    if (!slugMatch) continue;

    const slug = slugMatch[1].trim();
    const enBlock = extractLocaleBlock(content, "en");
    const plBlock = extractLocaleBlock(content, "pl");

    projects.push({
      slug,
      i18n: {
        en: {
          title: extractValue(enBlock, "title") || slug,
          subtitle:
            extractValue(enBlock, "subtitle") ||
            extractValue(enBlock, "description") ||
            "",
          thumbnail: extractValue(enBlock, "thumbnail"),
        },
        pl: {
          title: extractValue(plBlock, "title") || slug,
          subtitle:
            extractValue(plBlock, "subtitle") ||
            extractValue(plBlock, "description") ||
            "",
          thumbnail: extractValue(plBlock, "thumbnail"),
        },
      },
    });
  }

  return projects;
}

async function generate() {
  await ensureDirs();

  // Default site OG
  await renderOg({
    filename: "site.png",
    title: "Michał Gacka",
    subtitle: "Software Engineer · ML & Full-stack",
    kicker: "Portfolio",
  });

  for (const locale of locales) {
    const languageLabel = locale === "pl" ? "Strona główna" : "Homepage";

    await renderOg({
      filename: `home-${locale}.png`,
      title: "Michał Gacka",
      subtitle: locale === "pl" ? "Inżynier oprogramowania" : "Software Engineer",
      kicker: languageLabel,
      imagePath: "/images/me2.jpg",
    });

    await renderOg({
      filename: `me-${locale}.png`,
      title: "Michał Gacka",
      subtitle: locale === "pl" ? "Inżynier oprogramowania i deweloper full-stack" : "Software Engineer & Full-stack Developer",
      kicker: "",
      imagePath: "/images/me1.jpg",
    });
  }

  const projects = await getProjectData();
  for (const project of projects) {
    for (const locale of locales) {
      const data = project.i18n[locale] || project.i18n.en;
      await renderProjectOg({
        locale,
        slug: project.slug,
        title: data.title,
        subtitle: data.subtitle,
        thumbnailPath: data.thumbnail,
      });
    }
  }
}

generate().catch((error) => {
  console.error("OG generation failed:", error);
  process.exit(1);
});
