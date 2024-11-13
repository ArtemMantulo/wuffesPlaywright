import { expect, test } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ProductBasePage } from '../../pages/ProductBase.page';
import { ProductNames } from '../../pages/enums/ProductNames';

let checkoutPage: CheckoutPage;
let productPage: ProductBasePage;

test.beforeEach(async ({ page }) => {
  productPage = new ProductBasePage(page);
  checkoutPage = new CheckoutPage(page);
});


test('Advanced-hip-joint-support-for-small-medium-breeds', async ({ page }) => {
  
  let intelligemsRequests: string[] = [];
  await page.route('https://wuffs.com/products/advanced-hip-joint-support-for-small-medium-breeds', route => {
    const url = route.request().url();
    intelligemsRequests.push(url); // Track blocked requests
    console.warn(`Blocking Intelligems script: ${url}`);
    route.abort(); // Abort request
  });

  await page.route('https://cdn.intelligems.io/**', route => {
    console.warn(`Blocking CDN request: ${route.request().url()}`);
    route.abort();
  });
  
  await page.route('https://api.intelligems.io/**', route => {
    console.warn(`Blocking API request: ${route.request().url()}`);
    route.abort();
  });


  // Monitor any unexpected requests to Intelligems (fallback)
  page.on('request', request => {
    const url = request.url();
    if (url.includes('intelligems.io') && !intelligemsRequests.includes(url)) {
      console.warn(`Unexpected request to Intelligems detected: ${url}`);
      intelligemsRequests.push(url);
    }
  });

  await page.goto('https://wuffes.com/products/advanced-hip-joint-support-for-small-medium-breeds', {
    timeout: 45000,
    waitUntil: 'load' // 'domcontentloaded' or 'networkidle' are also options
  });

  if (intelligemsRequests.length > 0) {
    console.error('Test failed: Intelligems requests were detected.');
    console.error('Requests:', intelligemsRequests);
  } else {
    console.log('Test passed: No requests to Intelligems were detected.');
  }

  await productPage.changePurchaseTypeOption();
  // await expect(productPage.productNameInTitle).toHaveText(/Advanced Hip & Joint Support/);
  // await expect(productPage.productPackaging).toHaveText("180g / 6.35oz / 60 chews");
  // await productPage.selectDogSizeByWeight(" 0 - 35 lbs ");
  // await productPage.getOneTimePickerByMonthNumber("1", "2").click();
  // await expect(productPage.finalPrice).toHaveText("$38.97");
  // await expect(await productPage.getOneTimePickerLabelByMonthNumber("1", "2")).toContainText("2");
  // await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("1", "2")).toHaveText("Month(s) supply");

  // await productPage.clickSubmitButton();
  // await productPage.verifyAndRemoveCartItem({
  //   itemNumber: "1",
  //   expectedPrice: "$38.97",
  //   expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
  //   expectedQuantity: "1",
  // })
  // await productPage.shoppingCart.drawerClose.click();

  // await productPage.getOneTimePickerByMonthNumber("1", "4").click();
  // await expect(productPage.finalPrice).toHaveText("$75.99");
  // await expect(await productPage.getOneTimePickerByMonthNumber("1", "4")).toContainText("4");
  // await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("1", "4")).toHaveText("Month(s) supply");

  // await productPage.clickSubmitButton();
  // await productPage.verifyAndRemoveCartItem({
  //   itemNumber: "1",
  //   expectedPrice: "$75.99",
  //   expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
  //   expectedQuantity: "2",
  // })
  // await productPage.shoppingCart.drawerClose.click();

  // await productPage.getOneTimePickerByMonthNumber("1", "6").click();
  // await expect(productPage.finalPrice).toHaveText("$111.06");
  // await expect(await productPage.getOneTimePickerByMonthNumber("1", "6")).toContainText("6");
  // await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("1", "6")).toHaveText("Month(s) supply");

  // await productPage.clickSubmitButton();
  // await productPage.verifyAndRemoveCartItem({
  //   itemNumber: "1",
  //   expectedPrice: "$111.06",
  //   expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
  //   expectedQuantity: "3",
  // })
  // await productPage.shoppingCart.drawerClose.click();

  // await productPage.selectDogSizeByWeight(" 36 - 65 lbs");
  // await productPage.getOneTimePickerByMonthNumber("2", "1").click();
  // await expect(productPage.finalPrice).toHaveText("$35.07");
  // await expect(await productPage.getOneTimePickerByMonthNumber("2", "1")).toContainText("1");
  // await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("2", "1")).toHaveText("Month(s) supply");

  // await productPage.clickSubmitButton();
  // await productPage.verifyAndRemoveCartItem({
  //   itemNumber: "1",
  //   expectedPrice: "$35.07",
  //   expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
  //   expectedQuantity: "1",
  // })
  // await productPage.shoppingCart.drawerClose.click();

  // await productPage.getOneTimePickerByMonthNumber("2", "3").click();
  // await expect(productPage.finalPrice).toHaveText("$99.37");
  // await expect(await productPage.getOneTimePickerByMonthNumber("2", "3")).toContainText("3");
  // await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("2", "3")).toHaveText("Month(s) supply");

  // await productPage.clickSubmitButton();
  // await productPage.verifyAndRemoveCartItem({
  //   itemNumber: "1",
  //   expectedPrice: "$99.37",
  //   expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
  //   expectedQuantity: "2",
  // })
  // await productPage.shoppingCart.drawerClose.click();

  // await productPage.getOneTimePickerByMonthNumber("2", "6").click();
  // await expect(productPage.finalPrice).toHaveText("$181.21");
  // await expect(await productPage.getOneTimePickerByMonthNumber("2", "6")).toContainText("6");
  // await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("2", "6")).toHaveText("Month(s) supply");

  // await productPage.clickSubmitButton();
  // await productPage.verifyAndRemoveCartItem({
  //   itemNumber: "1",
  //   expectedPrice: "$181.21",
  //   expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
  //   expectedQuantity: "6",
  // })
  // await productPage.shoppingCart.drawerClose.click();

});

test('Advanced-hip-joint-support-for-large-breeds', async ({ page }) => {
  await page.goto('https://wuffes.com/products/advanced-hip-joint-support-for-small-medium-breeds');
  await productPage.goToOver65WeightPage();


  await expect(productPage.productNameInTitle).toHaveText(/Advanced Hip & Joint Support/);
  await expect(productPage.productPackaging).toHaveText("246g / 8.67oz / 30 chews");
  await productPage.selectDogSizeByWeight(" 65 - 100 lbs ");
  await productPage.getOneTimePickerByMonthNumber("2", "1").click();
  await expect(productPage.finalPrice).toHaveText("$44.96");
  await expect(await productPage.getOneTimePickerByMonthNumber("2", "1")).toContainText("1");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("2", "1")).toHaveText("Month(s) supply");

  await productPage.getOneTimePickerByMonthNumber("2", "3").click();
  await expect(productPage.finalPrice).toHaveText("$127.37");
  await expect(await productPage.getOneTimePickerByMonthNumber("2", "3")).toContainText("3");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("2", "3")).toHaveText("Month(s) supply");

  await productPage.getOneTimePickerByMonthNumber("2", "6").click();
  await expect(productPage.finalPrice).toHaveText("$233.77");
  await expect(await productPage.getOneTimePickerByMonthNumber("2", "6")).toContainText("6");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("2", "6")).toHaveText("Month(s) supply");



  await productPage.selectDogSizeByWeight(" 100 - 120 lbs");
  await productPage.getOneTimePickerByMonthNumber("3", "2").click();
  await expect(productPage.finalPrice).toHaveText("$127.37");
  await expect(await productPage.getOneTimePickerByMonthNumber("3", "2")).toContainText("2");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("3", "2")).toHaveText("Month(s) supply");

  await productPage.getOneTimePickerByMonthNumber("3", "4").click();
  await expect(productPage.finalPrice).toHaveText("$233.77");
  await expect(await productPage.getOneTimePickerByMonthNumber("3", "4")).toContainText("4");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("3", "4")).toHaveText("Month(s) supply");

  await productPage.getOneTimePickerByMonthNumber("3", "6").click();
  await expect(productPage.finalPrice).toHaveText("$332.67");
  await expect(await productPage.getOneTimePickerByMonthNumber("3", "6")).toContainText("6");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("3", "6")).toHaveText("Month(s) supply");


  await productPage.selectDogSizeByWeight("Over 120 lbs");
  await productPage.getOneTimePickerByMonthNumber("4", "1").click();
  await expect(productPage.finalPrice).toHaveText("$87.41");
  await expect(await productPage.getOneTimePickerByMonthNumber("4", "1")).toContainText("1");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("4", "1")).toHaveText("Month(s) supply");

  await productPage.getOneTimePickerByMonthNumber("4", "3").click();
  await expect(productPage.finalPrice).toHaveText("$233.77");
  await expect(await productPage.getOneTimePickerByMonthNumber("4", "3")).toContainText("3");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("4", "3")).toHaveText("Month(s) supply");

  await productPage.getOneTimePickerByMonthNumber("4", "6").click();
  await expect(productPage.finalPrice).toHaveText("$443.56");
  await expect(await productPage.getOneTimePickerByMonthNumber("4", "6")).toContainText("6");
  await expect(await productPage.getOneTimePickerLabelTextByMonthNumber("4", "6")).toHaveText("Month(s) supply");

});