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

test('Advanced-joint-liquid', async ({ page }) => {
  await page.goto('https://wuffes.com/products/advanced-joint-liquid');
  await page.waitForLoadState("load");

  await productPage.selectDogSizeByWeight("0-20lbs");
  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$62.99");

  await productPage.selectSubscriptionIntervalByMonth("6");
  await expect(productPage.finalPrice).toHaveText("$122.48");

  await productPage.selectSubscriptionIntervalByMonth("9");
  await expect(productPage.finalPrice).toHaveText("$178.47");

  await productPage.selectDogSizeByWeight("20-40lbs");
  await productPage.selectSubscriptionIntervalByMonth("1.5");
  await expect(productPage.finalPrice).toHaveText("$62.99");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$122.48");

  await productPage.selectSubscriptionIntervalByMonth("4.5");
  await expect(productPage.finalPrice).toHaveText("$178.47");

  await productPage.selectDogSizeByWeight("40-60lbs");
  await productPage.selectSubscriptionIntervalByMonth("1");
  await expect(productPage.finalPrice).toHaveText("$62.99");

  await productPage.selectSubscriptionIntervalByMonth("2");
  await expect(productPage.finalPrice).toHaveText("$122.48");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$178.47");

  await productPage.selectDogSizeByWeight("60-80lbs");
  await productPage.selectSubscriptionIntervalByMonth("1.5");
  await expect(productPage.finalPrice).toHaveText("$122.48");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$230.97");

  await productPage.selectSubscriptionIntervalByMonth("4.5");
  await expect(productPage.finalPrice).toHaveText("$325.45");

  await productPage.selectDogSizeByWeight("80-100lbs");
  await productPage.selectSubscriptionIntervalByMonth("1");
  await expect(productPage.finalPrice).toHaveText("$122.48");

  await productPage.selectSubscriptionIntervalByMonth("2");
  await expect(productPage.finalPrice).toHaveText("$178.47");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$279.96");

  await productPage.selectDogSizeByWeight("100+lbs");
  await productPage.selectSubscriptionIntervalByMonth("1");
  await expect(productPage.finalPrice).toHaveText("$122.48");

  await productPage.selectSubscriptionIntervalByMonth("2");
  await expect(productPage.finalPrice).toHaveText("$230.97");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$325.45");
});
