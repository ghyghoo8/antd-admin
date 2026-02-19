#!/usr/bin/env node
const puppeteer = require('puppeteer-core');

(async () => {
  // Use CHROME_PATH env var if provided, otherwise default macOS Chrome path
  const executablePath = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const url = process.env.E2E_URL || 'http://localhost:7000';

  try {
    const browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const title = await page.title();
    console.log('E2E: page title =>', title);
    await browser.close();
    if (!/antd-admin/i.test(title)) process.exit(1);
    process.exit(0);
  } catch (err) {
    console.error('E2E error:', err);
    process.exit(1);
  }
})();
