import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/Product.page';
import { CheckoutPage } from '../pages/CheckoutPage';

let checkoutPage: CheckoutPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  productPage = new ProductPage(page);
  checkoutPage = new CheckoutPage(page);
});

test('Wild-alaskan-salmon-oil-8oz', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-salmon-oil');
  await productPage.goToUnder20WeightPage();

  console.log(await page.url());
  //await expect(page.url()).toEqual("https://wuffes.com/products/wild-alaskan-salmon-oil-8oz")

  await productPage.selectDogSizeByWeight("Under 20 lbs");
  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$22.49");

  await productPage.selectSubscriptionIntervalByMonth("6");
  await expect(productPage.finalPrice).toHaveText("$43.48");

  await productPage.selectSubscriptionIntervalByMonth("9");
  await expect(productPage.finalPrice).toHaveText("$63.72");

  await productPage.selectDogSizeByWeight("21-40 lbs");
  await productPage.selectSubscriptionIntervalByMonth("1.5");
  await expect(productPage.finalPrice).toHaveText("$22.49");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$43.48");

  await productPage.selectSubscriptionIntervalByMonth("4.5");
  await expect(productPage.finalPrice).toHaveText("$63.72");
});

test('Wild-alaskan-salmon-oil', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-salmon-oil', {
    timeout: 45000,
    waitUntil: 'load' // 'domcontentloaded' or 'networkidle' are also options
  });

  await productPage.selectDogSizeByWeight("41-60 lbs");
  await productPage.selectSubscriptionIntervalByMonth("2");
  await expect(productPage.finalPrice).toHaveText("$32.39");

  await productPage.selectSubscriptionIntervalByMonth("4");
  await expect(productPage.finalPrice).toHaveText("$62.62");

  await productPage.selectSubscriptionIntervalByMonth("6");
  await expect(productPage.finalPrice).toHaveText("$91.77");

  await productPage.selectDogSizeByWeight("61-80 lbs");
  await productPage.selectSubscriptionIntervalByMonth("1.5");
  await expect(productPage.finalPrice).toHaveText("$32.39");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$62.62");

  await productPage.selectSubscriptionIntervalByMonth("4.5");
  await expect(productPage.finalPrice).toHaveText("$91.77");

  await productPage.selectDogSizeByWeight("81-100 lbs");
  await productPage.selectSubscriptionIntervalByMonth("1");
  await expect(productPage.finalPrice).toHaveText("$32.39");

  await productPage.selectSubscriptionIntervalByMonth("2");
  await expect(productPage.finalPrice).toHaveText("$62.62");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$91.77");

  await productPage.selectDogSizeByWeight("Over 100 lbs");
  await productPage.selectSubscriptionIntervalByMonth("1");
  await expect(productPage.finalPrice).toHaveText("$32.39");

  await productPage.selectSubscriptionIntervalByMonth("2");
  await expect(productPage.finalPrice).toHaveText("$62.62");

  await productPage.selectSubscriptionIntervalByMonth("3");
  await expect(productPage.finalPrice).toHaveText("$91.77");

});
