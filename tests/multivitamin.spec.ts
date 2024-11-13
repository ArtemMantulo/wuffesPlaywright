import { expect, test } from '@playwright/test';
import { QuizPage } from './pages/QuizPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductPage } from './pages/Product.page';

let checkoutPage: CheckoutPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  productPage = new ProductPage(page);
  checkoutPage = new CheckoutPage(page);
});

test('23-in-1-multivitamin', async ({ page }) => {
  await page.goto('https://wuffes.com/products/23-in-1-multivitamin');
  await page.waitForLoadState("load");

  await productPage.selectDogSizeByWeight("0-24 lbs");
  await productPage.selectSubscriptionIntervalByMonth("2");
  await expect(productPage.finalPrice).toHaveText("$40.50");

  await productPage.selectSubscriptionIntervalByMonth("4");
  await expect(productPage.finalPrice).toHaveText("$78.30");

  await productPage.selectSubscriptionIntervalByMonth("6");
  await expect(productPage.finalPrice).toHaveText("$114.75");

  await productPage.selectDogSizeByWeight("25-74 lbs");
  await productPage.selectSubscriptionIntervalByMonth("1");
  await expect(productPage.finalPrice).toHaveText("$40.50");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$114.75");

  await productPage.selectSubscriptionIntervalByMonth("6");
  await expect(productPage.finalPrice).toHaveText("$210.60");

  await productPage.selectDogSizeByWeight("75+ lbs");
  await productPage.selectSubscriptionIntervalByMonth("1");
  await expect(productPage.finalPrice).toHaveText("$78.30");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$210.60");

  await productPage.selectSubscriptionIntervalByMonth("6");
  await expect(productPage.finalPrice).toHaveText("$399.60");
});
