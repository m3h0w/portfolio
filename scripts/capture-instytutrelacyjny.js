const { chromium } = require("playwright");

async function waitForImages(page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2500);

  await page.evaluate(async () => {
    const scrollStep = 800;
    for (let y = 0; y < document.body.scrollHeight; y += scrollStep) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    window.scrollTo(0, 0);
  });

  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        });
      })
    );
  });
}

async function capture() {
  const browser = await chromium.launch();

  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(60000);
  await page.goto("https://www.instytutrelacyjny.pl/", { waitUntil: "networkidle" });
  await waitForImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "public/images/instytutrelacyjny/hero.png", fullPage: true });

  const pageThumb = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  pageThumb.setDefaultTimeout(60000);
  pageThumb.setDefaultNavigationTimeout(60000);
  await pageThumb.goto("https://www.instytutrelacyjny.pl/", { waitUntil: "networkidle" });
  await waitForImages(pageThumb);
  await pageThumb.evaluate(() => window.scrollTo(0, 0));
  await pageThumb.screenshot({ path: "public/images/instytutrelacyjny/thumbnail.png" });

  await browser.close();
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
