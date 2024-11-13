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
  await page.goto('https://wuffes.com/products/advanced-hip-joint-support-for-small-medium-breeds', {
    timeout: 45000,
    waitUntil: 'load' // 'domcontentloaded' or 'networkidle' are also options
  });

  await expect(productPage.productNameInTitle).toHaveText(/Advanced Hip & Joint Support/);
  await expect(productPage.productPackaging).toHaveText("180g / 6.35oz / 60 chews");
  await productPage.selectDogSizeByWeight(" 0 - 35 lbs ");
  await productPage.getSubPickerByMonthNumber("1", "2").click();
  await expect(productPage.finalPrice).toHaveText("$35.07");
  await expect(await productPage.getSubPickerLabelByMonthNumber("1", "2")).toContainText("2");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("1", "2")).toHaveText("Month(s) supply");
  
  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$35.07",
    expectedOldPrice: "$38.97",
    expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
    expectedQuantity: "1",
    expectedShipment: " Ships every 2 months "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("1", "4").click();
  await expect(productPage.finalPrice).toHaveText("$68.20");
  await expect(await productPage.getSubPickerLabelByMonthNumber("1", "4")).toContainText("4");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("1", "4")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$68.20",
    expectedOldPrice: "$77.94",
    expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
    expectedQuantity: "2",
    expectedShipment: " Ships every 4 months "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("1", "6").click();
  await expect(productPage.finalPrice).toHaveText("$99.37");
  await expect(await productPage.getSubPickerLabelByMonthNumber("1", "6")).toContainText("6");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("1", "6")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$99.37",
    expectedOldPrice: "$116.91",
    expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
    expectedQuantity: "3",
    expectedShipment: " Ships every 6 months "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectDogSizeByWeight(" 36 - 65 lbs");
  await productPage.getSubPickerByMonthNumber("2", "1").click();
  await expect(productPage.finalPrice).toHaveText("$35.07");
  await expect(await productPage.getSubPickerLabelByMonthNumber("2", "1")).toContainText("1");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("1", "6")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$35.07",
    expectedOldPrice: "$38.97",
    expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
    expectedQuantity: "1",
    expectedShipment: " Ships every 1 month "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("2", "3").click();
  await expect(productPage.finalPrice).toHaveText("$99.37");
  await expect(await productPage.getSubPickerLabelByMonthNumber("2", "3")).toContainText("3");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("2", "3")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$99.37",
    expectedOldPrice: "$116.91",
    expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
    expectedQuantity: "3",
    expectedShipment: " Ships every 3 months "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("2", "6").click();
  await expect(productPage.finalPrice).toHaveText("$181.21");
  await expect(await productPage.getSubPickerLabelByMonthNumber("2", "6")).toContainText("6");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("2", "6")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$181.21",
    expectedOldPrice: "$233.82",
    expectedName: ProductNames.AdvancedHipJointSupportSmallMedium,
    expectedQuantity: "6",
    expectedShipment: " Ships every 6 months "
  })
  await productPage.shoppingCart.drawerClose.click();

});

test('Advanced-hip-joint-support-for-large-breeds', async ({ page }) => {
  await page.goto('https://wuffes.com/products/advanced-hip-joint-support-for-small-medium-breeds');
  await productPage.goToOver65WeightPage();

  await expect(productPage.productNameInTitle).toHaveText(/Advanced Hip & Joint Support/);
  await expect(productPage.productPackaging).toHaveText("246g / 8.67oz / 30 chews");

  // 65 - 100 lbs Selection
  await productPage.selectDogSizeByWeight(" 65 - 100 lbs ");
  await productPage.getSubPickerByMonthNumber("2", "1").click();
  await expect(productPage.finalPrice).toHaveText("$44.96");
  await expect(await productPage.getSubPickerLabelByMonthNumber("2", "1")).toContainText("1");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("2", "1")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$44.96",
    expectedOldPrice: "$49.95",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "1",
    expectedShipment: " Ships every 1 month "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("2", "3").click();
  await expect(productPage.finalPrice).toHaveText("$127.37");
  await expect(await productPage.getSubPickerLabelByMonthNumber("2", "3")).toContainText("3");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("2", "3")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$127.37",
    expectedOldPrice: "$149.85",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "3",
    expectedShipment: " Ships every 3 months "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("2", "6").click();
  await expect(productPage.finalPrice).toHaveText("$233.77");
  await expect(await productPage.getSubPickerLabelByMonthNumber("2", "6")).toContainText("6");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("2", "6")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$233.77",
    expectedOldPrice: "$299.70",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "6",
    expectedShipment: " Ships every 6 months "
  })
  await productPage.shoppingCart.drawerClose.click();

  // 100 - 120 lbs Selection
  await productPage.selectDogSizeByWeight(" 100 - 120 lbs ");
  await productPage.getSubPickerByMonthNumber("3", "2").click();
  await expect(productPage.finalPrice).toHaveText("$127.37");
  await expect(await productPage.getSubPickerLabelByMonthNumber("3", "2")).toContainText("2");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("3", "2")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$127.37",
    expectedOldPrice: "$149.85",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "3",
    expectedShipment: " Ships every 2 months "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("3", "4").click();
  await expect(productPage.finalPrice).toHaveText("$233.77");
  await expect(await productPage.getSubPickerLabelByMonthNumber("3", "4")).toContainText("4");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("3", "4")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$233.77",
    expectedOldPrice: "$299.70",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "6",
    expectedShipment: " Ships every 4 months "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("3", "6").click();
  await expect(productPage.finalPrice).toHaveText("$332.67");
  await expect(await productPage.getSubPickerLabelByMonthNumber("3", "6")).toContainText("6");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("3", "6")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$332.67",
    expectedOldPrice: "$449.55",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "9",
    expectedShipment: " Ships every 6 months "
  });
  await productPage.shoppingCart.drawerClose.click();

  // Over 120 lbs Selection
  await productPage.selectDogSizeByWeight("Over 120 lbs");
  await productPage.getSubPickerByMonthNumber("4", "1").click();
  await expect(productPage.finalPrice).toHaveText("$87.41");
  await expect(await productPage.getSubPickerLabelByMonthNumber("4", "1")).toContainText("1");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("4", "1")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$87.41",
    expectedOldPrice: "$99.90",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "2",
    expectedShipment: " Ships every 1 month "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("4", "3").click();
  await expect(productPage.finalPrice).toHaveText("$233.77");
  await expect(await productPage.getSubPickerLabelByMonthNumber("4", "3")).toContainText("3");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("4", "3")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$233.77",
    expectedOldPrice: "$299.70",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "6",
    expectedShipment: " Ships every 3 months "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.getSubPickerByMonthNumber("4", "6").click();
  await expect(productPage.finalPrice).toHaveText("$443.56");
  await expect(await productPage.getSubPickerLabelByMonthNumber("4", "6")).toContainText("6");
  await expect(await productPage.getSubPickerLabelTextByMonthNumber("4", "6")).toHaveText("Month(s) supply");

  await productPage.clickSubmitButton();
  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$443.56",
    expectedOldPrice: "$599.40",
    expectedName: ProductNames.AdvancedHipJointSupportforLargeBreeds,
    expectedQuantity: "12",
    expectedShipment: " Ships every 6 months "
  });
  await productPage.shoppingCart.drawerClose.click();
});
