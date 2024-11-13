import { Locator, Page, expect } from '@playwright/test';

export class CheckoutPage {

    constructor(readonly page: Page) {}

  // Email Input
  private readonly emailInput = this.page.locator('[placeholder="Email"]');

  // Address Fields
  private readonly addressInput = this.page.locator('[placeholder="Address"]');
  private readonly apartmentInput = this.page.locator(`[placeholder="Apartment, suite, etc. (optional)"]`);
  private readonly cityInput = this.page.locator(`[placeholder="City"]`);
  private readonly stateSelect = this.page.locator('#Select1');
  private readonly zipCodeInput = this.page.locator(`[placeholder="ZIP code"]`);

  // Name Fields
  private readonly firstNameInput = this.page.locator('[placeholder="First name"]');
  private readonly lastNameInput = this.page.locator('[placeholder="Last name"]');

  // Card Information Frames
  private readonly cardNumberFrame = this.page.frameLocator('iframe[name*="card-fields-number"]');
  private readonly expiryFrame = this.page.frameLocator('iframe[name*="card-fields-expiry"]');
  private readonly cvvFrame = this.page.frameLocator('iframe[name*="verification_value"]');
  private readonly nameOnCardFrame = this.page.frameLocator('iframe[name*="card-fields-name"]');

  // Checkout Button
  private readonly checkoutBtn = this.page.locator('#checkout-pay-button');

  // Order Summary
  readonly orderSummary = this.page.locator('#order-summary');

  readonly shipping = this.page.locator(`//span[contains(text(), 'Shipping')]//ancestor::div[@role='row']//div[@role = 'cell']/span`);

  readonly mainItemPriceInfo = (text: string) => 
    this.page.locator(`//p[contains(text(), '${text}')]//ancestor::div[@role='row']`).nth(-1);

  readonly mainItemInfo = (text: string) => 
    this.page.locator(`//p[contains(text(), '${text}')]//ancestor::div[@role='row']`);
    
  
  async verifyShipmentIsFree(): Promise<any> {
    await expect(this.shipping).toHaveText("Free");
  }


  async getWeightAndProductType(productName:string): Promise<Locator> {
    return this.mainItemInfo(productName).locator("//p").nth(1);
  }

  async getDeliveryFrequency(productName:string): Promise<Locator> {
    return this.mainItemInfo(productName).locator("//p", { hasText: 'Delivery every' });
  }

  async getActualPriceByProductName(productName:string): Promise<Locator> {
    return this.mainItemPriceInfo(productName).locator("//div[@role= 'cell'][last()]//p");
  }

  async getPriceWithNoDiscountByProductName(productName:string): Promise<Locator> {
    return this.mainItemPriceInfo(productName).locator("//del");
  }

  async fillCheckoutForm(email: string, address: string, apartment: string, city: string, state: string, zip: string, firstName: string, lastName: string) {
    await this.emailInput.fill(email);
    await this.addressInput.fill(address);
    await this.apartmentInput.fill(apartment);
    await this.cityInput.fill(city);
    await this.stateSelect.selectOption({ value: state });
    await this.zipCodeInput.fill(zip);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async fillCardInformation(cardNumber: string, expiry: string, cvv: string, name: string) {
    await this.cardNumberFrame.locator('[placeholder="Card number"]').fill(cardNumber);
    await this.expiryFrame.locator('[placeholder="Expiration date (MM / YY)"]').fill(expiry);
    await this.cvvFrame.locator('[placeholder="Security code"]').fill(cvv);
    await this.nameOnCardFrame.locator('#name').fill(name);
  }

  async completeCheckout() {
    await this.checkoutBtn.click();
  }

  async verifyOrderSummary(expectedAmount: string, expectedDelivery: string, expectedQuantity: string) {
    await this.page.waitForLoadState('load');
    await this.orderSummary.locator('tfoot').waitFor();
    await expect(this.orderSummary.locator('tfoot')).toContainText(expectedAmount);
    await expect(this.orderSummary).toContainText(expectedDelivery);
    await expect(this.orderSummary).toContainText(expectedQuantity);
  }
}