import { expect, test } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ProductBasePage } from '../../pages/ProductBase.page';


let checkoutPage: CheckoutPage;
let productPage: ProductBasePage;

test.beforeEach(async ({ page }) => {
  productPage = new ProductBasePage(page);
  checkoutPage = new CheckoutPage(page);
});

test('Wild-alaskan-pollock-oil-8oz subsription options', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-8oz?view=wapo08&preview_theme_id=133029298311');

  await expect(productPage.productNameInTitle).toHaveText(/Wild Alaskan Pollock Oil/);
  await expect(productPage.productPackaging).toHaveText("8oz / 237ml");
  await productPage.selectDogSizeByWeight("Under 20 lbs");
  await productPage.getSubPickerByMonthNumber("1", "3").click();
  await expect(productPage.finalPrice).toHaveText("$2.49");
  await expect(await productPage.getSubPickerLabelByMonthNumber("1", "3")).toHaveText("3 Month(s) supply");

  await productPage.getSubPickerByMonthNumber("1", "6").click();
  await expect(productPage.finalPrice).toHaveText("$43.73");
  await expect(await productPage.getSubPickerLabelByMonthNumber("1", "6")).toHaveText("6 Month(s) supply");

  await productPage.getSubPickerByMonthNumber("1", "9").click();
  await expect(productPage.finalPrice).toHaveText("$63.72");
  await expect(await productPage.getSubPickerLabelByMonthNumber("1", "9")).toHaveText("9 Month(s) supply");

  await productPage.selectDogSizeByWeight("21 - 40 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("2","1");
  await expect(productPage.finalPrice).toHaveText("$22.49");
  await expect(await productPage.getSubPickerLabel("2", "1")).toHaveText("1.5 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("2","2");
  await expect(productPage.finalPrice).toHaveText("$43.73");
  await expect(await productPage.getSubPickerLabel("2", "2")).toHaveText("3 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("2","3");
  await expect(productPage.finalPrice).toHaveText("$63.72");
  await expect(await productPage.getSubPickerLabel("2", "3")).toHaveText("4.5 Month(s) supply");
});



test('Wild-alaskan-pollock-oil-8oz one time options', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-8oz?view=wapo08&preview_theme_id=133029298311');

  await productPage.purchaseTypeCheckbox.click();
  await productPage.selectDogSizeByWeight("Under 20 lbs");
  await productPage.selectOneTimeIntervalByPickerNumber("1","1");
  await expect(productPage.finalPrice).toHaveText("$24.99");
  await expect(await productPage.getOneTimePickerLabel("1", "1")).toHaveText("3 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("1","2");
  await expect(productPage.finalPrice).toHaveText("$48.73");
  await expect(await productPage.getOneTimePickerLabel("1", "2")).toHaveText("6 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("1","3");
  await expect(productPage.finalPrice).toHaveText("$71.22");
  await expect(await productPage.getOneTimePickerLabel("1", "3")).toHaveText("9 Month(s) supply");

  await productPage.selectDogSizeByWeight("21 - 40 lbs ");
  await productPage.selectOneTimeIntervalByPickerNumber("2","1");
  await expect(productPage.finalPrice).toHaveText("$24.99");
  await expect(await productPage.getOneTimePickerLabel("2", "1")).toHaveText("1.5 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("2","2");
  await expect(productPage.finalPrice).toHaveText("$48.73");
  await expect(await productPage.getOneTimePickerLabel("2", "2")).toHaveText("3 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("2","3");
  await expect(productPage.finalPrice).toHaveText("$71.22");
  await expect(await productPage.getOneTimePickerLabel("2", "3")).toHaveText("4.5 Month(s) supply");
});


test('Wild-alaskan-pollock-oil-16oz subscription options', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-16oz?view=wapo16&preview_theme_id=133029298311');

  await expect(productPage.productNameInTitle).toHaveText(/Wild Alaskan Pollock Oil/);
  await expect(productPage.productPackaging).toHaveText("16oz / 473ml");
  await productPage.selectDogSizeByWeight("41 - 60 lbs");
  await productPage.selectSubscriptionIntervalByPickerNumber("2","1");
  await expect(productPage.finalPrice).toHaveText("$32.39");
  await expect(await productPage.getSubPickerLabel("2", "1")).toHaveText("2 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("2","2");
  await expect(productPage.finalPrice).toHaveText("$62.98");
  await expect(await productPage.getSubPickerLabel("2", "2")).toHaveText("4 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("2","3");
  await expect(productPage.finalPrice).toHaveText("$91.77");
  await expect(await productPage.getSubPickerLabel("2", "3")).toHaveText("6 Month(s) supply");

  await productPage.selectDogSizeByWeight("61 - 80 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("3","1");
  await expect(productPage.finalPrice).toHaveText("$32.39");
  await expect(await productPage.getSubPickerLabel("3", "1")).toHaveText("1.5 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("3","2");
  await expect(productPage.finalPrice).toHaveText("$62.98");
  await expect(await productPage.getSubPickerLabel("3", "2")).toHaveText("3 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("3","3");
  await expect(productPage.finalPrice).toHaveText("$91.77");
  await expect(await productPage.getSubPickerLabel("3", "3")).toHaveText("4.5 Month(s) supply");

  await productPage.selectDogSizeByWeight("81 - 100 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("4","1");
  await expect(productPage.finalPrice).toHaveText("$32.39");
  await expect(await productPage.getSubPickerLabel("4", "1")).toHaveText("1 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("4","2");
  await expect(productPage.finalPrice).toHaveText("$62.98");
  await expect(await productPage.getSubPickerLabel("4", "2")).toHaveText("2 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("4","3");
  await expect(productPage.finalPrice).toHaveText("$91.77");
  await expect(await productPage.getSubPickerLabel("4", "3")).toHaveText("3 Month(s) supply");

  await productPage.selectDogSizeByWeight("Over 100 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("5","1");
  await expect(productPage.finalPrice).toHaveText("$32.39");
  await expect(await productPage.getSubPickerLabel("5", "1")).toHaveText("1 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("5","2");
  await expect(productPage.finalPrice).toHaveText("$62.98");
  await expect(await productPage.getSubPickerLabel("5", "2")).toHaveText("2 Month(s) supply");

  await productPage.selectSubscriptionIntervalByPickerNumber("5","3");
  await expect(productPage.finalPrice).toHaveText("$91.77");
  await expect(await productPage.getSubPickerLabel("5", "3")).toHaveText("3 Month(s) supply");
});

test('Wild-alaskan-pollock-oil-16oz one time options', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-16oz?view=wapo16&preview_theme_id=133029298311');

  await productPage.purchaseTypeCheckbox.click();
  await productPage.selectDogSizeByWeight("41 - 60 lbs");
  await productPage.selectOneTimeIntervalByPickerNumber("2","1");
  await expect(productPage.finalPrice).toHaveText("$35.99");
  await expect(await productPage.getOneTimePickerLabel("2", "1")).toHaveText("2 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("2","2");
  await expect(productPage.finalPrice).toHaveText("$70.18");
  await expect(await productPage.getOneTimePickerLabel("2", "2")).toHaveText("4 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("2","3");
  await expect(productPage.finalPrice).toHaveText("$102.57");
  await expect(await productPage.getOneTimePickerLabel("2", "3")).toHaveText("6 Month(s) supply");

  await productPage.selectDogSizeByWeight("61 - 80 lbs ");
  await productPage.selectOneTimeIntervalByPickerNumber("3","1");
  await expect(productPage.finalPrice).toHaveText("$35.99");
  await expect(await productPage.getOneTimePickerLabel("3", "1")).toHaveText("1.5 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("3","2");
  await expect(productPage.finalPrice).toHaveText("$70.18");
  await expect(await productPage.getOneTimePickerLabel("3", "2")).toHaveText("3 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("3","3");
  await expect(productPage.finalPrice).toHaveText("$102.57");
  await expect(await productPage.getOneTimePickerLabel("3", "3")).toHaveText("4.5 Month(s) supply");

  await productPage.selectDogSizeByWeight("81 - 100 lbs ");
  await productPage.selectOneTimeIntervalByPickerNumber("4","1");
  await expect(productPage.finalPrice).toHaveText("$35.99");
  await expect(await productPage.getOneTimePickerLabel("4", "1")).toHaveText("1 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("4","2");
  await expect(productPage.finalPrice).toHaveText("$70.18");
  await expect(await productPage.getOneTimePickerLabel("4", "2")).toHaveText("2 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("4","3");
  await expect(productPage.finalPrice).toHaveText("$102.57");
  await expect(await productPage.getOneTimePickerLabel("4", "3")).toHaveText("3 Month(s) supply");

  await productPage.selectDogSizeByWeight("Over 100 lbs ");
  await productPage.selectOneTimeIntervalByPickerNumber("5","1");
  await expect(productPage.finalPrice).toHaveText("$35.99");
  await expect(await productPage.getOneTimePickerLabel("5", "1")).toHaveText("1 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("5","2");
  await expect(productPage.finalPrice).toHaveText("$70.18");
  await expect(await productPage.getOneTimePickerLabel("5", "2")).toHaveText("2 Month(s) supply");

  await productPage.selectOneTimeIntervalByPickerNumber("5","3");
  await expect(productPage.finalPrice).toHaveText("$102.57");
  await expect(await productPage.getOneTimePickerLabel("5", "3")).toHaveText("3 Month(s) supply");
});

