import { Page } from 'playwright';
import { expect, Locator } from '@playwright/test';
import { ShoppingCartBaseComp } from './ShoppingCartBase.comp';
import { el } from '@faker-js/faker/.';

export interface CartItemDetails { // Move the interface definition outside the class
  itemNumber: string;
  expectedPrice: string;
  expectedOldPrice?: string;
  expectedName?: string;
  expectedQuantity?: string;
  expectedShipment?: string;
}

export class ProductBasePage {
  constructor(readonly page: Page) { }

  readonly shoppingCart = new ShoppingCartBaseComp(this.page);

  readonly dogSizeTable = this.page.locator(`.picker-dogsizes`);

  readonly submitButton = this.page.locator(`#picker-submit_btn`);

  readonly croSubmitButton = this.page.locator(`#cro-test-price`);

  readonly productNameInTitle = this.page.locator(`.product-main_info-desktop`);

  readonly productPackaging = this.productNameInTitle.locator(`span.product-main_title_numbers`);

  readonly subscriptionCheckBox = this.page.locator(`#js__sotpsub_v2_purchase_type`);

  readonly priceBlock = this.page.locator(".redesigned_picker__price_block");

  readonly youPayPrice = this.priceBlock.locator(".redesigned_picker__price_block span#js__redesigned_picker__price_block_pay")

  readonly oldPriceValue = this.priceBlock.locator("js__redesigned_picker__price_block_value");

  readonly youSaveValue = this.priceBlock.locator(".js__redesigned_picker__price_block_save");

  readonly purchaseTypeCheckbox = this.page.locator(".picker-purchase_type-switcher");

  readonly finalPrice = this.page.locator("#picker-submit_btn-price_discounted");

  async clickSubmitButton() {
    if (await this.croSubmitButton.isVisible() && await this.croSubmitButton.isEnabled()) {
      await this.croSubmitButton.scrollIntoViewIfNeeded();
      await this.croSubmitButton.click();
    }
    else { 
      await this.submitButton.scrollIntoViewIfNeeded();
      await this.submitButton.click();
    }
  }

  async changePurchaseTypeOption() {
    await this.purchaseTypeCheckbox.scrollIntoViewIfNeeded();
    await this.purchaseTypeCheckbox.click()
  }

  // readonly getPickerByNumber = async (offerGroup: string, pickerNumber: string):  Promise<Locator>=>
  //  await this.page.locator(`#picker-dogsize_${offerGroup}_offers-group-sub`)
  //     .locator(`label[for='picker-sub-dogsize_1-offer_${pickerNumber}']`);

  // readonly getPickerLabel = async (offerGroup: string, pickerNumber: string): Promise<Locator> =>
  //       await (await this.getPickerByNumber(offerGroup, pickerNumber)).locator(".picker-offer_label-text");

  // Get picker for sub
  readonly getSubPickerByMonthNumber = (offerGroup: string, monthNumber: string): Locator =>
    this.page.locator(`//*[@id='picker-dogsize_${offerGroup}_offers-group-sub']`)
      .locator(`//label[contains(@class, 'picker-offer__label') or contains(@class, 'picker-offer_label')]`)
      .locator(`//p[contains(@class, 'picker-offer__label-text') or contains(@class, 'picker-offer_label-text')]`, { hasText: monthNumber.trim() })
      .locator("//ancestor::label");

  // Get picker label for sub (has month number in text)
  readonly getSubPickerLabelByMonthNumber = async (offerGroup: string, pickerNumber: string): Promise<Locator> =>
    this.getSubPickerByMonthNumber(offerGroup, pickerNumber)
      .locator("//div[contains(@class, 'picker-offer_label-left') or contains(@class, 'picker-offer__label-left') and not(contains(@class, 'redesigned-picker-frequency'))]//p[contains(@class, 'picker-offer__label-text') or contains(@class, 'picker-offer_label-text')]")
    
  // Get picker label text for sub (has month text in text)
  readonly getSubPickerLabelTextByMonthNumber = async (offerGroup: string, pickerNumber: string): Promise<Locator> =>
        (await this.getSubPickerLabelByMonthNumber(offerGroup, pickerNumber)).locator(".picker-offer__label-text-item");

  readonly getOneTimePickerByMonthNumber = (offerGroup: string, monthNumber: string): Locator =>
    this.page.locator(`//*[@id='picker-dogsize_${offerGroup}_offers-group-otp']`)
      .locator(`//label[contains(@class, 'picker-offer__label') or contains(@class, 'picker-offer_label')]`)
      .locator(`//p[contains(@class, 'picker-offer__label-text') or contains(@class, 'picker-offer_label-text')]`, { hasText: monthNumber.trim() })
      .locator("//ancestor::label");

  readonly getOneTimePickerLabelByMonthNumber = async (offerGroup: string, pickerNumber: string): Promise<Locator> =>
    this.getOneTimePickerByMonthNumber(offerGroup, pickerNumber)
      .locator("//div[contains(@class, 'picker-offer_label-left') or contains(@class, 'picker-offer__label-left') and not(contains(@class, 'redesigned-picker-frequency'))]//p[contains(@class, 'picker-offer__label-text') or contains(@class, 'picker-offer_label-text')]")

  readonly getOneTimePickerLabelTextByMonthNumber = async (offerGroup: string, pickerNumber: string): Promise<Locator> =>
    (await this.getOneTimePickerLabelByMonthNumber(offerGroup, pickerNumber)).locator(".picker-offer__label-text-item");


  ////// Old design

  readonly getSubPickerByNumber = (offerGroup: string, pickerNumber: string): Locator =>
    this.page.locator(`#picker-dogsize_${offerGroup}_offers-group-sub`)
      .locator(`label[for='picker-sub-dogsize_${offerGroup}-offer_${pickerNumber}']`);

  readonly getOneTimePickerByNumber = (offerGroup: string, pickerNumber: string): Locator =>
    this.page.locator(`#picker-dogsize_${offerGroup}_offers-group-otp`)
      .locator(`label[for='picker-otp-dogsize_${offerGroup}-offer_${pickerNumber}']`);

  readonly getSubPickerLabel = async (offerGroup: string, pickerNumber: string): Promise<Locator> =>
    await this.getSubPickerByNumber(offerGroup, pickerNumber).locator(".picker-offer_label-text");

  readonly getOneTimePickerLabel = async (offerGroup: string, pickerNumber: string): Promise<Locator> =>
    await this.getSubPickerByNumber(offerGroup, pickerNumber).locator(".picker-offer_label-text");


  async verifySaveValueIsCalculatedAccordingly() {
    const oldPrice = this.removeDollarSign(await this.oldPriceValue.innerText());
    const youPayPrice = this.removeDollarSign(await this.youPayPrice.innerText());
    await expect(parseFloat(await this.youSaveValue.innerText())).toEqual(oldPrice - youPayPrice)
    await this.subscriptionCheckBox.uncheck()
  }

  readonly selectSubscriptionIntervalByPickerNumber = async (offerGroup: string, pickerNumber: string) =>
    await this.getSubPickerByNumber(offerGroup, pickerNumber).locator(".picker-offer_label-circle")
      .click();

  readonly selectOneTimeIntervalByPickerNumber = async (offerGroup: string, pickerNumber: string) =>
    await this.getOneTimePickerByNumber(offerGroup, pickerNumber).locator(".picker-offer_label-circle")
      .click();

  async uncheckSubscription(name: string) {
    await this.subscriptionCheckBox.uncheck()
  }

  readonly selectDogSizeByWeight = async (dogSize: string) => {
    //const locators = await this.page.locator(`.picker-dogsizes label`).innerText();
    const locator = this.page.locator(`.picker-dogsizes label`).filter({ hasText: dogSize });
    await expect(locator).toBeVisible();
    await locator.waitFor({ state: 'visible', timeout: 5000 }); // Ensure the locator is visible
    const isVisible = await locator.isVisible()
    await locator.click();
  };

  readonly goToOver65WeightPage = () => this.dogSizeTable.locator(`a`).click();

  readonly goToUnder20WeightPage = () => this.dogSizeTable.locator(`a`).click();


  removeDollarSign(price: string): number {
    return parseFloat(price.replace('$', ''));
  }
  
  async verifyAndRemoveCartItem({
    itemNumber,
    expectedPrice: expectedNewPrice,
    expectedOldPrice,
    expectedName,
    expectedQuantity,
    expectedShipment
  }: CartItemDetails): Promise<void> {
    await expect(this.shoppingCart.getItemNewPriceByNumber(itemNumber)).toHaveText(expectedNewPrice);
  
    // Check for optional parameters before asserting them
    if (expectedOldPrice) {
      await expect(this.shoppingCart.getItemOldPriceByNumber(itemNumber)).toHaveText(expectedOldPrice);
    }
    if (expectedName) {
      await expect(this.shoppingCart.getItemNamebyNumber(itemNumber)).toHaveText(expectedName);
    }
    if (expectedQuantity) {
      await expect(this.shoppingCart.getItemQuantitybyNumber(itemNumber)).toHaveValue(expectedQuantity);
    }
    if (expectedShipment) {
      await expect(this.shoppingCart.getItemShipmentbyNumber(itemNumber)).toHaveText(expectedShipment);
    }
    await this.shoppingCart.removeItemByNumber(itemNumber);
  }

}