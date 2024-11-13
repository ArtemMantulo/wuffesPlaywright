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

test('Pollock-oil-8oz sub add to drawer', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-8oz?view=wapo08&preview_theme_id=133029298311');

  await productPage.selectDogSizeByWeight("Under 20 lbs");
  await productPage.selectSubscriptionIntervalByPickerNumber("1","1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$22.49",
    expectedOldPrice: "$24.99",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "1",
    expectedShipment: " Ships every 90 days "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("1","2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$43.73",
    expectedOldPrice: "$49.98",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "2",
    expectedShipment: " Ships every 180 days "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("1","3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$63.72",
    expectedOldPrice: "$74.97",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "3",
    expectedShipment: " Ships every 270 days "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectDogSizeByWeight("21 - 40 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("2","1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$22.49",
    expectedOldPrice: "$24.99",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "1",
    expectedShipment: " Ships every 47 days "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("2","2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$43.73",
    expectedOldPrice: "$49.98",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "2",
    expectedShipment: " Ships every 94 days "
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("2","3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$63.72",
    expectedOldPrice: "$74.97",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "3",
    expectedShipment: " Ships every 141 days "
  })
  await productPage.shoppingCart.drawerClose.click();
});

test('Pollock-oil-8oz one time add to drawer', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-8oz?view=wapo08&preview_theme_id=133029298311');

  await productPage.purchaseTypeCheckbox.click();
  await productPage.selectDogSizeByWeight("Under 20 lbs");
  await productPage.selectOneTimeIntervalByPickerNumber("1","1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$24.99",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "1",
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectOneTimeIntervalByPickerNumber("1","2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$48.73",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "2",
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectOneTimeIntervalByPickerNumber("1","3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$71.22",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "3",
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectDogSizeByWeight("21 - 40 lbs ");
  await productPage.selectOneTimeIntervalByPickerNumber("2","1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$24.99",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "1",
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectOneTimeIntervalByPickerNumber("2","2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$48.73",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "2",
  })
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectOneTimeIntervalByPickerNumber("2","3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$71.22",
    expectedName: ProductNames.WildAlaskanPollockOil8oz,
    expectedQuantity: "3",
  })
  await productPage.shoppingCart.drawerClose.click();
});

// test('Pollock-oil-16oz sub add to drawer', async ({ page }) => {
//   await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-16oz?view=wapo16&preview_theme_id=133029298311');

//   //////////////////////////// 41 - 60 lbs
//   await productPage.selectDogSizeByWeight("41 - 60 lbs");
//   await productPage.selectSubscriptionIntervalByPickerNumber("2","1");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$32.39", "$35.99", ProductNames.WildAlaskanPollockOil16oz, "1", " Ships every 63 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("2","2");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$62.98", "$71.98", ProductNames.WildAlaskanPollockOil16oz, "2", " Ships every 126 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("2","3");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$91.77", "$107.97", ProductNames.WildAlaskanPollockOil16oz, "3", " Ships every 189 days ")
//   await productPage.shoppingCart.drawerClose.click();


//     //////////////////////////// 61 - 80 lbs 
//   await productPage.selectDogSizeByWeight("61 - 80 lbs ");
//   await productPage.selectSubscriptionIntervalByPickerNumber("3","1");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$32.39", "$35.99", ProductNames.WildAlaskanPollockOil16oz, "1", " Ships every 47 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("3","2");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$62.98", "$71.98", ProductNames.WildAlaskanPollockOil16oz, "2", " Ships every 94 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("3","3");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$91.77", "$107.97", ProductNames.WildAlaskanPollockOil16oz, "3", " Ships every 141 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   //////////////////////////// 81 - 100 lbs
//   await productPage.selectDogSizeByWeight("81 - 100 lbs ");
//   await productPage.selectSubscriptionIntervalByPickerNumber("4","1");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$32.39", "$35.99", ProductNames.WildAlaskanPollockOil16oz, "1", " Ships every 37 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("4","2");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$62.98", "$71.98", ProductNames.WildAlaskanPollockOil16oz, "2", " Ships every 74 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("4","3");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$91.77", "$107.97", ProductNames.WildAlaskanPollockOil16oz, "3", " Ships every 111 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   //////////////////////////// 81 - 100 lbs
//   await productPage.selectDogSizeByWeight("Over 100 lbs ");
//   await productPage.selectSubscriptionIntervalByPickerNumber("5","1");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$32.39", "$35.99", ProductNames.WildAlaskanPollockOil16oz, "1", " Ships every 31 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("5","2");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$62.98", "$71.98", ProductNames.WildAlaskanPollockOil16oz, "2", " Ships every 62 days ")
//   await productPage.shoppingCart.drawerClose.click();

//   await productPage.selectSubscriptionIntervalByPickerNumber("5","3");
//   await productPage.submitButton.click();

//   await productPage.verifyAndRemoveCartItem("1", "$91.77", "$107.97", ProductNames.WildAlaskanPollockOil16oz, "3", " Ships every 93 days ")
//   await productPage.shoppingCart.drawerClose.click();
// });


test('Pollock-oil-16oz sub add to drawer', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-16oz?view=wapo16&preview_theme_id=133029298311');

  //////////////////////////// 41 - 60 lbs
  await productPage.selectDogSizeByWeight("41 - 60 lbs");
  await productPage.selectSubscriptionIntervalByPickerNumber("2", "1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$32.39",
    expectedOldPrice: "$35.99",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "1",
    expectedShipment: " Ships every 63 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("2", "2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$62.98",
    expectedOldPrice: "$71.98",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "2",
    expectedShipment: " Ships every 126 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("2", "3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$91.77",
    expectedOldPrice: "$107.97",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "3",
    expectedShipment: " Ships every 189 days "
  });
  await productPage.shoppingCart.drawerClose.click();


  //////////////////////////// 61 - 80 lbs
  await productPage.selectDogSizeByWeight("61 - 80 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("3", "1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$32.39",
    expectedOldPrice: "$35.99",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "1",
    expectedShipment: " Ships every 47 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("3", "2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$62.98",
    expectedOldPrice: "$71.98",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "2",
    expectedShipment: " Ships every 94 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("3", "3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$91.77",
    expectedOldPrice: "$107.97",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "3",
    expectedShipment: " Ships every 141 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  //////////////////////////// 81 - 100 lbs
  await productPage.selectDogSizeByWeight("81 - 100 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("4", "1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$32.39",
    expectedOldPrice: "$35.99",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "1",
    expectedShipment: " Ships every 37 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("4", "2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$62.98",
    expectedOldPrice: "$71.98",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "2",
    expectedShipment: " Ships every 74 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("4", "3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$91.77",
    expectedOldPrice: "$107.97",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "3",
    expectedShipment: " Ships every 111 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  //////////////////////////// Over 100 lbs
  await productPage.selectDogSizeByWeight("Over 100 lbs ");
  await productPage.selectSubscriptionIntervalByPickerNumber("5", "1");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$32.39",
    expectedOldPrice: "$35.99",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "1",
    expectedShipment: " Ships every 31 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("5", "2");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$62.98",
    expectedOldPrice: "$71.98",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "2",
    expectedShipment: " Ships every 62 days "
  });
  await productPage.shoppingCart.drawerClose.click();

  await productPage.selectSubscriptionIntervalByPickerNumber("5", "3");
  await productPage.submitButton.click();

  await productPage.verifyAndRemoveCartItem({
    itemNumber: "1",
    expectedPrice: "$91.77",
    expectedOldPrice: "$107.97",
    expectedName: ProductNames.WildAlaskanPollockOil16oz,
    expectedQuantity: "3",
    expectedShipment: " Ships every 93 days "
  });
  await productPage.shoppingCart.drawerClose.click();
});
test('Pollock-oil-16oz one time add to drawer', async ({ page }) => {
  await page.goto('https://wuffes.com/products/wild-alaskan-pollock-oil-16oz?view=wapo16&preview_theme_id=133029298311');

    //////////////////////////// 41 - 60 lbs
    await productPage.purchaseTypeCheckbox.click();
    await productPage.selectDogSizeByWeight("41 - 60 lbs");
    await productPage.selectOneTimeIntervalByPickerNumber("2", "1");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$35.99",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "1",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("2", "2");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$70.18",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "2",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("2", "3");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$102.57",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "3",
    });
    await productPage.shoppingCart.drawerClose.click();

    //////////////////////////// 61 - 80 lbs
    await productPage.selectDogSizeByWeight("61 - 80 lbs");
    await productPage.selectOneTimeIntervalByPickerNumber("3", "1");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$35.99",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "1",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("3", "2");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$70.18",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "2",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("3", "3");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$102.57",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "3",
    });
    await productPage.shoppingCart.drawerClose.click();

    //////////////////////////// 81 - 100 lbs
    await productPage.selectDogSizeByWeight("81 - 100 lbs");
    await productPage.selectOneTimeIntervalByPickerNumber("4", "1");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$35.99",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "1",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("4", "2");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$70.18",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "2",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("4", "3");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$102.57",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "3",
    });
    await productPage.shoppingCart.drawerClose.click();

    //////////////////////////// Over 100 lbs
    await productPage.selectDogSizeByWeight("Over 100 lbs");
    await productPage.selectOneTimeIntervalByPickerNumber("5", "1");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$35.99",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "1",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("5", "2");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$70.18",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "2",
    });
    await productPage.shoppingCart.drawerClose.click();

    await productPage.selectOneTimeIntervalByPickerNumber("5", "3");
    await productPage.submitButton.click();

    await productPage.verifyAndRemoveCartItem({
      itemNumber: "1",
      expectedPrice: "$102.57",
      expectedName: ProductNames.WildAlaskanPollockOil16oz,
      expectedQuantity: "3",
    });
    await productPage.shoppingCart.drawerClose.click();
  });
