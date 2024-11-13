import { Page } from 'playwright';

export class ShoppingCartComp {
  constructor(readonly page: Page) {}

  readonly shipment = this.page.locator(`.product-option`);
  
  readonly cartContent = this.page.locator(`//div[@id = 'js__cart_drawer_content']`);

  readonly cartItem = this.cartContent.locator(`//*[@id = 'cart_drawer__items']`);

  readonly cartItemInfo = this.cartItem.locator(`.cart_drawer__item_info__1`);

  readonly itemName = this.cartContent.locator(`.cart_drawer__item_title`)

  readonly itemPrice = this.cartItem.locator(`cart_drawer__item_price`);

  readonly itemPriceOld = this.cartItem.locator(`cart_drawer__item_price__old`);

  readonly subscriptionInfo = this.cartItem.locator(`cart_drawer__item_subscription`);

  readonly cartDrawerFooter = this. cartContent.locator(`.cart_drawer__footer`);

  readonly totalPrice = this.cartDrawerFooter.locator(`span`).nth(0);

  readonly checkOutButton = this.cartDrawerFooter.locator(`#js__cart_drawer_submit_btn`);


  readonly itemNewPriceByTubsAmount = (tubesAmount: string) => 
    this.page.locator(`//span[@id = 'js__interval_price_new_sub_${tubesAmount}']`);

  
  readonly itemOldPriceByTubsAmount = (tubesAmount: string) => 
    this.page.locator(`//span[@id = 'js__interval_price_old_sub_${tubesAmount}']`);


}