import { expect, test } from "@playwright/test";

test.describe('Product List Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ch15.01-03/ex14/');
  });

  test('should display all products when "all" is selected', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', 'all');
    const products = page.locator('#productList li:visible');
    await expect(products).toHaveCount(3);
  });

  test('should display only food products when "food" is selected', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', 'food');
    const products = page.locator('#productList li:visible');
    await expect(products).toHaveCount(1);
    await expect(products.nth(0)).toHaveText('お菓子 - ¥1000');
  });

  test('should display only stationery products when "stationery" is selected', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', 'stationery');
    const products = page.locator('#productList li:visible');
    await expect(products).toHaveCount(2);
    await expect(products.nth(0)).toHaveText('消しゴム - ¥200');
    await expect(products.nth(1)).toHaveText('ものさし - ¥300');
  });

  test('should display all products again when "all" is re-selected', async ({ page }) => {
    await page.selectOption('select[data-testid="select"]', 'stationery');
    await page.selectOption('select[data-testid="select"]', 'all');
    const products = page.locator('#productList li:visible');
    await expect(products).toHaveCount(3);
  });
});
