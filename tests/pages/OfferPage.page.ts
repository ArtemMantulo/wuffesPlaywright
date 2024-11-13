import { expect } from '@playwright/test';
import { Locator, Page } from 'playwright';

export class OfferPage {
  
  constructor(readonly page: Page) {}



  readonly subscriptionOfferContainer = this.page.locator(`#offer-picker--sub`);

  readonly oneTimeOfferContainer = this.page.locator(`#offer-picker--onetime`);

  readonly pickerLocator:string = `.form__select-block`;

  readonly buyOnceButton = this.subscriptionOfferContainer.locator(`popup-picker-opener button`);

  readonly switchToSubButton = this.oneTimeOfferContainer.locator(`button.form__button-switch`);

  readonly proceedButton = this.subscriptionOfferContainer.locator(`.offer__button`);

  readonly offerPickerByValue = (pickerValue: string, offerType: string, offerPickerLocator:Locator) => 
    offerPickerLocator.locator(this.pickerLocator).locator(`[for = 'offer_${offerType}_${pickerValue}__']`);

  async verifyPickerIsSelected(pickerLocator: Locator) {
    const isSelected = await pickerLocator.evaluate((element) => {
        const beforeStyle = window.getComputedStyle(element, '::before');
        return beforeStyle.getPropertyValue('content') !== 'none';
    });

    expect(isSelected).toBe(true);
  }

  readonly pickerCircleByValueForSub = (pickerValue: string, offerPickerLocator: Locator) => 
    this.offerPickerByValue(pickerValue, "sub", offerPickerLocator)
        .locator('.label-left span');

  readonly pickerCircleByValueForOneTime = (pickerValue: string, offerPickerLocator: Locator) => 
    this.offerPickerByValue(pickerValue, "onetime", offerPickerLocator)
        .locator('.label-left span');

  readonly pickerPriceByValueForSub = (pickerValue: string, offerPickerLocator: Locator) => 
    this.offerPickerByValue(pickerValue, "sub", offerPickerLocator)
        .locator('.label-right p:not(.disabled) strong');

  readonly pickerOldPriceByValueForSub = (pickerValue: string, offerPickerLocator: Locator) => 
      this.offerPickerByValue(pickerValue, "sub",  offerPickerLocator)
          .locator('.label-right p.disabled strong');

  readonly pickerPriceByValueForOneTime = (pickerValue: string, offerPickerLocator: Locator) => 
      this.offerPickerByValue(pickerValue, "onetime", offerPickerLocator)
          .locator('.label-right p:not(.disabled) strong');
        
  readonly pickerOldPriceByValueForOneTime = (pickerValue: string, offerPickerLocator: Locator) => 
      this.offerPickerByValue(pickerValue, "onetime",  offerPickerLocator)
          .locator('.label-right p.disabled strong');

  
  async proceedToCheckOut() {
     await this.proceedButton.click();
 }

}