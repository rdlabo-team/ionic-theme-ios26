import { test, expect } from '@playwright/test';

/**
 * Screenshot tests for all routes defined in index.routes.ts
 *
 * This test suite captures full-page screenshots for each route
 * to ensure visual consistency across the application.
 */

const routes = [
  { path: '/main/index', name: 'index' },
  { path: '/main/index/action-sheet', name: 'action-sheet' },
  { path: '/main/index/alert', name: 'alert' },
  { path: '/main/index/button', name: 'button' },
  { path: '/main/index/checkbox', name: 'checkbox' },
  { path: '/main/index/range', name: 'range' },
  { path: '/main/index/toast', name: 'toast' },
  { path: '/main/index/toggle', name: 'toggle' },
  { path: '/main/index/segment', name: 'segment' },
  { path: '/main/index/modal', name: 'modal' },
  { path: '/main/index/card', name: 'card' },
  { path: '/main/index/chip', name: 'chip' },
  { path: '/main/index/breadcrumbs', name: 'breadcrumbs' },
  { path: '/main/index/searchbar', name: 'searchbar' },
  { path: '/main/index/popover', name: 'popover' },
  { path: '/main/index/progress-indicators', name: 'progress-indicators' },
  { path: '/main/index/floating-action-button', name: 'floating-action-button' },
  { path: '/main/index/select', name: 'select' },
  { path: '/main/index/radio', name: 'radio' },
  { path: '/main/index/date-and-time-pickers', name: 'date-and-time-pickers' },
  { path: '/main/index/accordion', name: 'accordion' },
  { path: '/main/index/inputs', name: 'inputs' },
  { path: '/main/index/item-list', name: 'item-list' },
  { path: '/main/index/reorder', name: 'reorder' },
  { path: '/main/index/tabs', name: 'tabs' },
  { path: '/main/index/toolbar', name: 'toolbar' },
];

test.describe('Screenshot Tests - All Routes', () => {
  for (const route of routes) {
    test(`should match screenshot for ${route.name}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await page.waitForSelector('ion-content', { timeout: 10000 });
      await page.waitForTimeout(1500);
      const scrollHeight = await page.locator('ion-content').evaluate(async (el: any) => {
        const scrollEl = await el.getScrollElement();
        return scrollEl.scrollHeight;
      });
      await page.setViewportSize({ width: 1200, height: scrollHeight });
      await expect(page).toHaveScreenshot(`${route.name}.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});

test.describe('Screenshot Tests - Dark Mode', () => {
  for (const route of routes) {
    test(`should match dark mode screenshot for ${route.name}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        document.documentElement.classList.add('ion-palette-dark');
      });
      await page.waitForSelector('ion-content', { timeout: 10000 });
      await page.waitForTimeout(1500);
      const scrollHeight = await page.locator('ion-content').evaluate(async (el: any) => {
        const scrollEl = await el.getScrollElement();
        return scrollEl.scrollHeight;
      });
      await page.setViewportSize({ width: 1200, height: scrollHeight });
      await expect(page).toHaveScreenshot(`${route.name}-dark.png`, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});
