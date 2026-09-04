import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const shots = [
  ['og.html', 1200, 630, 'public/og.png'],
  ['icon.html', 180, 180, 'public/apple-touch-icon.png'],
  ['icon.html', 32, 32, 'public/favicon-32.png'],
];

const ogHtml = readFileSync(new URL('og.html', import.meta.url), 'utf8');
const homeTs = readFileSync(
  new URL('../src/content/home.ts', import.meta.url),
  'utf8',
);
const heading = /heading: '([^']+)'/.exec(homeTs)?.[1];
if (!heading || !ogHtml.includes(heading)) {
  throw new Error(
    `scripts/og.html does not contain the hero heading: ${heading}`,
  );
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const [source, width, height, out] of shots) {
    await page.setViewportSize({ width, height });
    await page.goto(
      pathToFileURL(fileURLToPath(new URL(source, import.meta.url))).href,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: out, omitBackground: false });
    console.log(`wrote ${out}`);
  }
} finally {
  await browser.close();
}
