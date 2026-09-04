import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 0,
  expect: { toHaveScreenshot: { maxDiffPixels: 120 } },
  use: { baseURL: 'http://127.0.0.1:4321' },
  webServer: {
    command:
      'pnpm exec astro build && pnpm exec astro preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
    timeout: 180_000,
    // Astro 7 backgrounds `astro preview` when it detects an agent shell; this keeps it in the foreground for Playwright.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: 'mobile',
      use: {
        browserName: 'chromium',
        viewport: { width: 375, height: 812 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
