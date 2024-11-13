import { Page } from 'playwright';
import { ShoppingCartComp } from './ShoppingCart.comp';
import { expect } from '@playwright/test';

export class ProductPage {
  constructor(readonly page: Page) {}

  readonly shoppingCart = new ShoppingCartComp(this.page);

  private readonly dogSizeTable = this.page.locator(`.picker-dogsizes`);
  
  readonly submitButton = this.page.locator(`#js__total_submit_btn`);

  readonly subscriptionCheckBox = this.page.locator(`#js__sotpsub_v2_purchase_type`);

  readonly priceBlock = this.page.locator(".redesigned_picker__price_block");

  readonly youPayPrice = this.priceBlock.locator(".redesigned_picker__price_block span#js__redesigned_picker__price_block_pay")

  readonly oldPriceValue = this.priceBlock.locator("js__redesigned_picker__price_block_value");

  readonly youSaveValue = this.priceBlock.locator(".js__redesigned_picker__price_block_save")
  
  readonly finalPrice = this.page.locator(".redesigned_picker__price_block span#js__redesigned_picker__price_block_pay, #js__total_price_discounted")


  async verifySaveValueIsCalculatedAccordingly() {
    const oldPrice = this.removeDollarSign(await this.oldPriceValue.innerText());
    const youPayPrice = this.removeDollarSign(await this.youPayPrice.innerText());
    await expect(parseFloat(await this.youSaveValue.innerText())).toEqual(oldPrice - youPayPrice)
    await this.subscriptionCheckBox.uncheck()
  }

  readonly selectSubscriptionIntervalByMonth = async (monthNumber: string) =>
    await this.page.locator('span.interval_item__top_interval', { hasText: monthNumber }).click();

  async uncheckSubscription(name: string) {
    await this.subscriptionCheckBox.uncheck()
  }
  
  readonly selectDogSizeByWeight = async (dogSize: string) => {
    try {
      const locator = this.page.locator(`.picker-dogsizes label`).filter({hasText: dogSize});
      await expect(locator).toBeVisible();
      await locator.waitFor({ state: 'visible', timeout: 5000 }); // Ensure the locator is visible
      const isVisible = await locator.isVisible()
      await locator.click();
    } catch (error) {
      console.error(`Error selecting dog size '${dogSize}':`, error);
    }
  };

  readonly goToOver65WeightPage = () => this.dogSizeTable.locator(`a`).click();
  readonly goToUnder20WeightPage = () => this.dogSizeTable.locator(`a`).click();


  removeDollarSign(price: string): number {
    return parseFloat(price.replace('$', ''));
  }
 
}