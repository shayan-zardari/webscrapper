import Router from "express";
import puppeteer from "puppeteer";

const puppeteerRouter = new Router();

puppeteerRouter.post("/search", async (req, res) => {
  const { searchURL } = req.body;

  console.log("🚀 Launching a browser instance...");

  const browserInstance = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-blink-features=AutomationControlled", // disabling the automation feature in chromium
    ],
  });

  try {
    const page = await browserInstance.newPage();
    console.log("📄 newPage instantiated...");

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto("https://www.google.com", {
      waitUntil: "networkidle2",
      timeout: 10000,
    });

    const inputElement = await page.waitForSelector('textarea[name="q"]', {
      visible: true,
    });

    await inputElement.type(searchURL, { delay: 100 });
    await page.keyboard.press("Enter");

    await page.waitForSelector('#search', {timeout: 5000});

    const content = await page.content();

    console.log("📨 Sending data...");

    return res.status(200).send(content);

    await browserInstance.close();

  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  } finally {
    console.log("BrowserInstance closed. Bye 👋🏼");
  }
});

export default puppeteerRouter;
