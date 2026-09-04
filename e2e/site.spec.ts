import { expect, test } from '@playwright/test';
import { home } from '../src/content/home';
import { site } from '../src/site';

const { hero, sections } = home;
const beats = [
  ...sections.writing.beats,
  ...sections.editorial.beats,
  sections.export.beat,
];
type Fig = { src: string; alt: string; caption: string };
// The dictation beat ships text-only (no dictation.png yet), so figures are
// pulled by section rather than mapped uniformly over `beats`.
const figureContracts: Fig[] = [
  hero.figure,
  sections.writing.beats[0].figure,
  sections.writing.beats[1].figure,
  sections.writing.beats[2].figure,
  ...sections.editorial.beats.map((beat) => beat.figure),
  sections.export.beat.figure,
  sections.machine.figure,
];
const featureHeadings = [
  ...beats.map((beat) => beat.title),
  sections.ownership.heading,
  sections.export.heading,
  sections.machine.heading,
  sections.audience.heading,
];
const faqQuestions = sections.faq.items.map((item) => item.question);

test('renders the page title, one heading, and site chrome', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveTitle(home.title);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText(hero.heading);
  await expect(page.locator('header nav[aria-label="Primary"] a')).toHaveText([
    ...site.nav.map((item) => item.label),
    site.store.label,
  ]);
  await expect(page.locator('footer')).toContainText(home.footer.tagline);
});

test('renders the exact hero actions and status lines', async ({ page }) => {
  await page.goto('/');
  const heroSection = page
    .locator('main')
    .getByRole('heading', { level: 1 })
    .locator('..')
    .locator('..');
  await expect(heroSection.getByText(hero.eyebrow)).toBeVisible();
  await expect(
    heroSection.getByRole('link', { name: hero.primary.label }),
  ).toHaveAttribute('href', site.store.href);
  await expect(
    heroSection.getByRole('link', { name: hero.secondary.label }),
  ).toHaveAttribute('href', hero.secondary.href);
  await expect(heroSection).toContainText(hero.status);
});

test('states every feature, ownership boundary, and export promise', async ({
  page,
}) => {
  await page.goto('/');
  for (const heading of featureHeadings) {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
  }
  await expect(page.locator('#writing')).toContainText(
    sections.writing.beats[0].description,
  );
  await expect(page.locator('#editorial')).toContainText(
    sections.editorial.beats[1].description,
  );
  await expect(page.locator('#editorial')).toContainText(
    sections.editorial.beats[2].description,
  );
  await expect(page.locator('#ownership')).toContainText(
    sections.ownership.body,
  );
  await expect(page.locator('#ownership')).toContainText(
    sections.ownership.caption,
  );
  await expect(page.locator('#export')).toContainText(
    sections.export.beat.title,
  );
  await expect(page.locator('#export')).toContainText(
    sections.export.beat.description,
  );
});

test("renders every section's body", async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#ownership')).toContainText(
    sections.ownership.privacy,
  );
  await expect(page.locator('#machine')).toContainText(sections.machine.body);
  await expect(
    page.getByRole('heading', { name: sections.machine.beatTitle }),
  ).toBeVisible();
  await expect(page.locator('#audience')).toContainText(sections.audience.body);
  await expect(page.locator('#store')).toContainText(sections.store.body);
});

test('renders the exact responsive screen-capture contracts', async ({
  page,
}) => {
  await page.goto('/');
  const figures = page.locator('main figure');
  await expect(figures).toHaveCount(figureContracts.length);
  for (let index = 0; index < figureContracts.length; index += 1) {
    const figure = figures.nth(index);
    const image = figure.locator('img');
    const alt = await image.getAttribute('alt');
    const contract = figureContracts.find((f) => f.alt === alt);
    expect(contract, alt ?? undefined).toBeDefined();
    await expect(figure.locator('figcaption')).toHaveText(
      contract?.caption ?? '',
    );
    // The captures are element screenshots taken from the running app, so
    // each one has its own natural size. The contract is "always dimensioned,
    // never upscaled", not a single fixed geometry.
    const width = Number(await image.getAttribute('width'));
    const height = Number(await image.getAttribute('height'));
    expect(width).toBeGreaterThan(0);
    expect(width).toBeLessThanOrEqual(1280);
    expect(height).toBeGreaterThan(0);
    expect(
      await image.evaluate((element) => element.getBoundingClientRect().width),
      alt ?? undefined,
    ).toBeLessThanOrEqual(width + 0.5);
  }
  const images = page.locator('main img');
  await expect(images.first()).toHaveAttribute('loading', 'eager');
  await expect(images.first()).toHaveAttribute('fetchpriority', 'high');
  expect(await page.locator('main img[fetchpriority="high"]').count()).toBe(1);
  for (let index = 1; index < figureContracts.length; index += 1) {
    await expect(images.nth(index)).toHaveAttribute('loading', 'lazy');
  }
});

test('keeps the native FAQ closed until a writer opens it', async ({
  page,
}) => {
  await page.goto('/');
  const items = page.locator('main details');
  await expect(items.locator('summary')).toHaveText(faqQuestions);
  await expect(items).toHaveCount(faqQuestions.length);
  await expect(items.first()).not.toHaveAttribute('open', '');
  await items.first().locator('summary').click();
  await expect(items.first()).toHaveAttribute('open', '');
  await items.first().locator('summary').click();
  await expect(items.first()).not.toHaveAttribute('open', '');
});

test('keeps focus visible and lets keyboard users skip to the content', async ({
  page,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/u);
  const navLink = page.locator('header nav a[href="#editorial"]');
  await navLink.focus();
  await expect(navLink).toHaveCSS('outline-style', 'solid');
});

test('has no horizontal overflow at supported viewport widths', async ({
  page,
}) => {
  for (const width of [320, 375, 641, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      ),
      `homepage at ${width}px`,
    ).toBe(false);
  }
});

test('resolves every site anchor in the built page', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThan(3);
  for (const href of hrefs) {
    expect(href).toMatch(/^#[A-Za-z][\w-]*$/u);
    await expect(page.locator(`[id="${href?.slice(1)}"]`)).toHaveCount(1);
  }
});

test('ships the favicon set and the social image it declares', async ({
  page,
}) => {
  for (const path of [
    '/favicon.svg',
    '/favicon-32.png',
    '/apple-touch-icon.png',
    '/site.webmanifest',
    '/og.png',
    '/CNAME',
  ]) {
    const response = await page.request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

test('emits the metadata the deploy actually serves', async ({ page }) => {
  await page.goto('/');
  const head = page.locator('head');
  await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://world.ottercrew.group/',
  );
  await expect(head.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://world.ottercrew.group/',
  );
  await expect(head.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://world.ottercrew.group/og.png',
  );
  await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary_large_image',
  );
  await expect(
    head.locator('link[rel="icon"][type="image/svg+xml"]'),
  ).toHaveAttribute('href', '/favicon.svg');
  await expect(head.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    'href',
    '/apple-touch-icon.png',
  );
  await expect(head.locator('link[rel="manifest"]')).toHaveAttribute(
    'href',
    '/site.webmanifest',
  );
  await expect(head.locator('meta[name="theme-color"]')).toHaveCount(1);
  await expect(head.locator('link[rel="preload"][as="font"]')).toHaveCount(2);
});

test('renders every section heading through the same marker', async ({
  page,
}) => {
  await page.goto('/');
  const headings = page.locator('main h2');
  const count = await headings.count();
  expect(count).toBeGreaterThan(4);
  for (let index = 0; index < count; index += 1) {
    const h2 = headings.nth(index);
    await expect(h2).toHaveCSS('font-weight', '400');
    const rule = await h2.evaluate(
      (el) => getComputedStyle(el, '::before').width,
    );
    expect(rule, `h2 #${index} rule mark`).toBe('28px');
  }
  const closing = page.locator('main section').last().locator('a');
  await expect(closing).toHaveCSS('display', 'inline-flex');
});

test('emits no image file that no srcset references', async ({ page }) => {
  await page.goto('/');
  const { srcs, srcsets } = await page.evaluate(() => ({
    srcs: [...document.querySelectorAll('main img')].map((img) =>
      img.getAttribute('src'),
    ),
    srcsets: [...document.querySelectorAll('main img')]
      .map((img) => img.getAttribute('srcset') ?? '')
      .join(' '),
  }));
  for (const src of srcs) {
    expect(src && srcsets.includes(src), `${src} in a srcset`).toBe(true);
  }
});

test('puts every FAQ question in the heading outline', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main details summary h3')).toHaveCount(
    faqQuestions.length,
  );
  await expect(page.locator('main [style]')).toHaveCount(0);
});

test('renders every story-beat screenshot at the same width', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const widths = await page
    .locator('main ol li figure img')
    .evaluateAll((imgs) =>
      imgs.map((img) => img.getBoundingClientRect().width),
    );
  expect(widths.length).toBeGreaterThan(1);
  expect(new Set(widths.map((w) => Math.round(w))).size).toBe(1);
});

test('links to the Mac App Store without collecting email', async ({
  page,
}) => {
  await page.goto('/');
  const store = page.locator(`a[href="${site.store.href}"]`);
  await expect(store).toHaveCount(3);
  await expect(page.locator('header nav a').last()).toHaveText(
    site.store.label,
  );
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('script')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

const bannedWords = [
  'local-first',
  'resident machine',
  'inspectable',
  'surface',
  'leverage',
  'seamless',
  'hunk',
  'patch',
  'empower',
  'effortless',
  'exports directory',
  'system file manager',
  'part scope',
  'rule-and-stat',
  'analyzer counts',
];

test('reads like a person wrote it', async ({ page }) => {
  await page.goto('/');
  const text = (await page.locator('main').innerText()).toLowerCase();
  for (const word of bannedWords) {
    expect(text, word).not.toContain(word);
  }
  const once = ['one purchase', 'buy once', 'coming soon', 'download'];
  for (const phrase of once) {
    const count = text.split(phrase).length - 1;
    expect(count, phrase).toBeLessThanOrEqual(1);
  }
  expect(text.split('local').length - 1).toBeLessThanOrEqual(3);
  expect(text).not.toMatch(/return to any|restore|roll ?back|revert/u);
  const faqText = sections.faq.items
    .map((item) => item.answer)
    .join(' ')
    .toLowerCase();
  for (const word of bannedWords) {
    expect(faqText, `faq: ${word}`).not.toContain(word);
  }
  expect(faqText).not.toMatch(/roll ?back|revert/u);
});
