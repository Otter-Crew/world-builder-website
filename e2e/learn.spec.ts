import { expect, test } from '@playwright/test';

test('the header links to Learn and the hub lists at least one guide', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('header nav a', { hasText: 'Learn' }).click();
  await expect(page).toHaveURL(/\/learn\/$/u);
  await expect(page.locator('main h1')).toHaveText('Learn World Builder.');
  const guides = page.locator('main ol li a');
  expect(await guides.count()).toBeGreaterThan(0);
  await guides.first().click();
  await expect(page).toHaveURL(/\/learn\/getting-started\/$/u);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h2').first()).toBeVisible();
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://world.ottercrew.group/learn/getting-started/',
  );
});

test('every guide route resolves and links to the next', async ({ page }) => {
  await page.goto('/learn/');
  const hrefs = await page
    .locator('main ol li a')
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') ?? ''),
    );
  expect(hrefs).toHaveLength(14);
  for (const [index, href] of hrefs.entries()) {
    expect(href, `guide ${index + 1} href`).toMatch(/^\/learn\/.+\/$/u);
    const response = await page.goto(href);
    expect(response?.status(), href).toBe(200);
    await expect(page.locator('main h1')).toHaveCount(1);
    const next = page.getByRole('link', { name: /^Next:/u });
    if (index + 1 < hrefs.length) {
      const nextHref = hrefs[index + 1];
      if (nextHref === undefined)
        throw new Error('missing expected next guide');
      await expect(next).toHaveAttribute('href', nextHref);
    } else {
      await expect(next).toHaveCount(0);
    }
  }
});

test('keeps a closed mobile table of contents visible on desktop', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/learn/getting-started/');
  const toc = page.locator('nav[aria-label="On this page"]');
  await toc.locator('summary').click();
  await expect(toc.locator('details')).not.toHaveAttribute('open', '');
  await page.setViewportSize({ width: 641, height: 812 });
  await expect(toc.locator('ol')).toBeVisible();
});
