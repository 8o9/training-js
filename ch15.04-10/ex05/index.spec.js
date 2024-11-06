import { expect, test } from "@playwright/test";

test('inline-circle component should be displayed correctly =)', async ({ page }) => {
  // `npm run server`で実行後、`npm run test:browser ch15.04-10/ex05`
  await page.goto('/ch15.04-10/ex05/');

  const circle = await page.$('inline-circle');
  expect(circle).not.toBeNull();

  const width = await circle.evaluate(node => window.getComputedStyle(node).width);
  const height = await circle.evaluate(node => window.getComputedStyle(node).height);

  // toBe()でemを指定したらpxで帰ってきたのでpxで指定
  const defaultFontSize = await page.evaluate(() => {
    return parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  });
  const expectedWem = 10;
  const expectedHem = 10;
  const expectedWidthInPx = `${expectedWem * defaultFontSize}px`
  const expectedHeightInPx = `${expectedHem * defaultFontSize}px`
  expect(width).toBe(expectedWidthInPx);
  expect(height).toBe(expectedHeightInPx);
});