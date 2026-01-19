import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import sharp from "sharp";

const projectRoot = process.cwd();
const itemsDir = path.join(projectRoot, "src", "data", "portfolio", "items");
const publicDir = path.join(projectRoot, "public");

const LOCALES = ["en", "pl"];

const isLocalPublicAsset = (src) => typeof src === "string" && src.startsWith("/images/");
const isThumbnailPath = (src) => typeof src === "string" && src.includes("/images/thumbnails/");

const toFsPath = (publicUrlPath) => path.join(publicDir, publicUrlPath.replace(/^\//, ""));

async function fileExists(fsPath) {
  try {
    await fs.access(fsPath);
    return true;
  } catch {
    return false;
  }
}

async function sha256(fsPath) {
  const buf = await fs.readFile(fsPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function imageMeta(fsPath) {
  const buf = await fs.readFile(fsPath);
  const meta = await sharp(buf).metadata();
  return {
    width: meta.width ?? null,
    height: meta.height ?? null,
    format: meta.format ?? null,
    bytes: buf.byteLength,
  };
}

function collectSources(item, locale) {
  const data = item?.i18n?.[locale] ?? item?.i18n?.en;
  const sources = [];

  if (data?.heroImage) {
    sources.push({ kind: "hero", src: data.heroImage });
  }

  if (Array.isArray(data?.content)) {
    for (const block of data.content) {
      if (block?.type === "image" && block?.src) {
        sources.push({ kind: "content", src: block.src });
      }
    }
  }

  return sources;
}

function formatBytes(bytes) {
  if (bytes == null) return "?";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const MIN_HERO_WIDTH = 1200;

const itemFiles = (await fs.readdir(itemsDir))
  .filter((f) => f.endsWith(".js"))
  .sort((a, b) => a.localeCompare(b));

const report = {
  missing: [],
  smallHero: [],
  thumbnailHero: [],
  all: [],
};

const hashToRefs = new Map();

for (const file of itemFiles) {
  const modulePath = path.join(itemsDir, file);
  const url = new URL(`file://${modulePath}`);
  const mod = await import(url.href);
  const item = mod.default;
  const slug = item?.slug ?? file;

  for (const locale of LOCALES) {
    const sources = collectSources(item, locale);

    for (const { kind, src } of sources) {
      if (!isLocalPublicAsset(src)) continue;

      const fsPath = toFsPath(src);
      const exists = await fileExists(fsPath);
      if (!exists) {
        report.missing.push({ slug, locale, kind, src });
        continue;
      }

      const meta = await imageMeta(fsPath);
      const hash = await sha256(fsPath);

      const ref = {
        slug,
        locale,
        kind,
        src,
        fsPath: path.relative(projectRoot, fsPath),
        ...meta,
      };

      report.all.push(ref);

      if (kind === "hero") {
        if (isThumbnailPath(src)) {
          report.thumbnailHero.push(ref);
        }
        if (meta.width != null && meta.width < MIN_HERO_WIDTH) {
          report.smallHero.push(ref);
        }
      }

      const refs = hashToRefs.get(hash) ?? [];
      refs.push(ref);
      hashToRefs.set(hash, refs);
    }
  }
}

const duplicates = [];
for (const [hash, refs] of hashToRefs.entries()) {
  if (refs.length < 2) continue;
  duplicates.push({ hash, refs });
}

duplicates.sort((a, b) => b.refs.length - a.refs.length);

const printRef = (r) => {
  const size = r.width && r.height ? `${r.width}x${r.height}` : "?x?";
  return `- ${r.slug} [${r.locale}] ${r.kind}: ${r.src} (${size}, ${formatBytes(r.bytes)})`;
};

console.log("\n=== Portfolio image audit ===\n");
console.log(`Items scanned: ${itemFiles.length}`);
console.log(`Total local images referenced (hero + content): ${report.all.length}`);

console.log("\n-- Missing files --");
if (report.missing.length === 0) console.log("(none)");
else report.missing.forEach((m) => console.log(`- ${m.slug} [${m.locale}] ${m.kind}: ${m.src}`));

console.log(`\n-- Hero images that are thumbnails (${report.thumbnailHero.length}) --`);
if (report.thumbnailHero.length === 0) console.log("(none)");
else report.thumbnailHero.forEach((r) => console.log(printRef(r)));

console.log(`\n-- Hero images smaller than ${MIN_HERO_WIDTH}px wide (${report.smallHero.length}) --`);
if (report.smallHero.length === 0) console.log("(none)");
else report.smallHero.forEach((r) => console.log(printRef(r)));

console.log(`\n-- Duplicate images by file hash (${duplicates.length} groups) --`);
if (duplicates.length === 0) {
  console.log("(none)");
} else {
  for (const group of duplicates.slice(0, 25)) {
    const { refs } = group;
    const size = refs[0].width && refs[0].height ? `${refs[0].width}x${refs[0].height}` : "?x?";
    console.log(`\n${refs.length}× identical (${size}, ${formatBytes(refs[0].bytes)})`);
    refs.forEach((r) => console.log(printRef(r)));
  }
  if (duplicates.length > 25) {
    console.log(`\n… ${duplicates.length - 25} more duplicate groups omitted`);
  }
}
