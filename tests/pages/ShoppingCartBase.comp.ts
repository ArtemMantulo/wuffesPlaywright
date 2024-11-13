import { Page } from 'playwright';

export class ShoppingCartBaseComp {
  constructor(readonly page: Page) {}

  readonly drawerClose = this.page.locator(".drawer__close");

  readonly getCartDrawerItemnyNumber = (itemNumber: string) => 
    this.page.locator(`#CartDrawer-Item-${itemNumber}`);

  readonly getItemNewPriceByNumber = (itemNumber: string) => 
    this.getCartDrawerItemnyNumber(itemNumber).locator("span.price--end");

  readonly getItemOldPriceByNumber = (itemNumber: string) => 
    this.getCartDrawerItemnyNumber(itemNumber).locator("s.price--end");

  readonly removeItemByNumber = (itemNumber: string) => 
    this.getCartDrawerItemnyNumber(itemNumber).locator(".cart-remove-button").click();

  readonly getItemShipmentbyNumber = (itemNumber: string) => 
    this.getCartDrawerItemnyNumber(itemNumber).locator(".product-option");

  readonly getItemNamebyNumber = (itemNumber: string) => 
    this.getCartDrawerItemnyNumber(itemNumber).locator(".cart-item__name");
    
  readonly getItemQuantitybyNumber = (itemNumber: string) => 
    this.getCartDrawerItemnyNumber(itemNumber).locator(".quantity__input");



}