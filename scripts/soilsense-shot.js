const { chromium } = require("playwright");

const ORIGIN_URL = "https://soilsense.io/";
const CDX_URL =
  "https://web.archive.org/cdx/search/cdx?url=soilsense.io/&output=json&fl=timestamp,original,statuscode,mimetype&filter=statuscode:200&filter=mimetype:text/html&from=2023&to=2024";

function unarchiveUrl(url) {
  const match = url.match(
    /^https?:\/\/web\.archive\.org\/web\/\d+(?:im_)?\/(https?:\/\/.+)$/
  );
  return match ? match[1] : url;
}

async function getCaptures() {
  const res = await fetch(CDX_URL);
  const json = await res.json();
  const rows = json.slice(1);
  const timestamps = rows.map((r) => r[0]).filter(Boolean);
  const unique = Array.from(new Set(timestamps));
  return unique.slice(0, 6);
}

async function preparePage(page) {
  await page.route("**/*", async (route) => {
    const reqUrl = route.request().url();
    if (reqUrl.includes("web.archive.org/web/") && reqUrl.includes("static.tildacdn.com")) {
      return route.continue({ url: unarchiveUrl(reqUrl) });
    }
    return route.continue();
  });
}

async function restoreImages(page) {
  await page.evaluate(() => {
    const unarchiveUrl = (url) => {
      const match = url.match(
        /^https?:\/\/web\.archive\.org\/web\/\d+(?:im_)?\/(https?:\/\/.+)$/
      );
      return match ? match[1] : url;
    };

    document.querySelectorAll("img").forEach((img) => {
      if (img.getAttribute("data-original")) {
        img.src = unarchiveUrl(img.getAttribute("data-original"));
      }
      if (img.getAttribute("data-src")) {
        img.src = unarchiveUrl(img.getAttribute("data-src"));
      }
      if (img.getAttribute("data-srcset")) {
        img.srcset = unarchiveUrl(img.getAttribute("data-srcset"));
      }
      if (img.src) img.src = unarchiveUrl(img.src);
      if (img.srcset) {
        img.srcset = img.srcset
          .split(",")
          .map((s) => s.trim().split(" "))
          .map(([u, w]) => `${unarchiveUrl(u)} ${w || ""}`.trim())
          .join(", ");
      }
    });

    document.querySelectorAll("*").forEach((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg && bg.includes("web.archive.org")) {
        el.style.backgroundImage = bg.replace(
          /https?:\/\/web\.archive\.org\/web\/\d+(?:im_)?\/(https?:\/\/[^"\)]+)/g,
          "$1"
        );
      }
    });
  });
}

async function scrollToLoad(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const total = document.body.scrollHeight;
    const step = Math.max(200, Math.floor(window.innerHeight * 0.7));
    let y = 0;
    while (y < total) {
      window.scrollTo(0, y);
      y += step;
      await sleep(200);
    }
    window.scrollTo(0, 0);
  });
}

async function countLoadedImages(page) {
  return page.evaluate(() => {
    const imgs = Array.from(document.images);
    const loaded = imgs.filter((img) => img.complete && img.naturalWidth > 1);
    return { total: imgs.length, loaded: loaded.length };
  });
}

(async () => {
  const captures = await getCaptures();
  if (!captures.length) {
    throw new Error("No captures found in CDX.");
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  });

  await preparePage(page);

  let best = { timestamp: null, loaded: -1, total: 0, path: null };

  for (const ts of captures) {
    const archiveUrl = `https://web.archive.org/web/${ts}/${ORIGIN_URL}`;
    try {
      await page.goto(archiveUrl, { waitUntil: "domcontentloaded" });
      await restoreImages(page);
      await page.waitForTimeout(800);
      await scrollToLoad(page);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(800);

      const { total, loaded } = await countLoadedImages(page);
      const outPath = `public/images/soilsense/soilsense-archive-${ts}.png`;

      await page.screenshot({ path: outPath, fullPage: true });

      if (loaded > best.loaded) {
        best = { timestamp: ts, loaded, total, path: outPath };
      }
    } catch (err) {
      console.warn(`Capture ${ts} failed: ${err.message}`);
    }
  }

  if (best.path) {
    const fs = require("fs");
    fs.copyFileSync(best.path, "public/images/soilsense/soilsense-archive.png");
    console.log(
      `Best capture ${best.timestamp} with ${best.loaded}/${best.total} images. Saved public/images/soilsense/soilsense-archive.png`
    );
  }

  await browser.close();
})();
