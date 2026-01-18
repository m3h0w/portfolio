const { chromium } = require("playwright");

async function waitForImages(page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2500);

  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch {
        // Ignore font loading failures
      }
    }
  });

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

  await page.waitForFunction(
    () =>
      Array.from(document.images).every(
        (img) => img.complete && img.naturalWidth > 0
      ),
    { timeout: 15000 }
  );
}

async function capturePage(browser, url, path, viewport) {
  const page = await browser.newPage({ viewport });
  page.setDefaultTimeout(60000);
  page.setDefaultNavigationTimeout(60000);
  await page.goto(url, { waitUntil: "networkidle" });
  await waitForImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path, fullPage: true });
  await page.close();
}

async function capture() {
  const browser = await chromium.launch();

  await capturePage(
    browser,
    "https://lighthousecph.dk/dl/events",
    "public/images/lighthousecph/events.png",
    { width: 1600, height: 1200 }
  );

  await capturePage(
    browser,
    "https://lighthousecph.dk/dl/Home",
    "public/images/lighthousecph/home.png",
    { width: 1600, height: 1200 }
  );

  await browser.close();
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
