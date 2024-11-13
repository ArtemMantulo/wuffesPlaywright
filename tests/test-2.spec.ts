import { test, expect, Page } from '@playwright/test';
import { DogWeightRange } from './weightValues';

test('pets', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://wuffes.com/products/wild-alaskan-salmon-oil');

  // Fill Pet Name
  await page.locator('[placeholder="Pet name"]').click();
  await page.locator('[placeholder="Pet name"]').fill('Test');
  await page.locator('input[type="submit"][style*="opacity: 1"]').click();

  // Fill Age
  await page.locator('[placeholder="Age"]').click();
  await page.locator('[placeholder="Age"]').fill('20');
  await page.locator('input.js__quiz_next.quiz_step__btn').nth(1).click();

  // Fill Breed
  await page.locator('[placeholder="Start typing here"]').click();
  await page.locator('[placeholder="Start typing here"]').fill('Akita');
  await page.locator('input.js__quiz_next.quiz_step__btn').nth(2).click();

  // Select Weight
  await page.locator(`label[for='weight_1']`).click(); // Adjust based on your desired weight

  // Select "Just Right"
  await page.waitForTimeout(2000);
  await page.locator(`label[for='type_3']`).click();

  // Quiz Step 5: Select "Yes"
  await page.locator(`label[for='js__form_input_issues_1']`).click();

  // Quiz Step 6: Select "Mild Difficulty"
  await page.locator(`label[for='js__form_input_rate_climb_2']`).click();

  // Continue Buttons for Following Steps
  await page.locator('input.js__quiz_next.quiz_step__btn').nth(6).click();
  await page.locator(`label[for='js__form_input_rate_jump_2']`).click();
  await page.locator('input.js__quiz_next.quiz_step__btn').nth(7).click();
  await page.locator(`label[for='js__form_input_rate_get_up_2']`).click();
  await page.locator('input.js__quiz_next.quiz_step__btn').nth(8).click();
  await page.locator(`label[for='js__form_input_different-brand-1']`).click();

  // Fill Email for Results
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill('Test_artem@gmail.com');
  await page.locator(`//*[@value= 'See My Personalized Results']`).click();

  await page.waitForTimeout(10000);
  await page.locator('.js__progress_bar__inner_test').waitFor({ state: 'detached', timeout: 15000 });
  await page.waitForLoadState('load');
  await checkElementVisibility(page);
  
  // Proceed to Checkout
  await page.locator('.picker_jc_new__btn_guarantee_wrap').click();
  await page.locator('#js__submit_btn__sub').click();

  // Checkout Form - fill fields
  await page.locator('#js__submit_btn__sub').waitFor({ state: 'hidden', timeout: 25000 });
  await page.waitForLoadState('load');
  await page.locator('[placeholder="Email"]').fill('test@wuffes.com');
  await page.locator('[placeholder="Address"]').click();
  await page.locator('[placeholder="Address"]').fill('2322 La Costa Avenue unit a');
  await page.locator(`[placeholder="Apartment, suite, etc. (optional)"]`).fill("Artem apartments");
  await page.locator(`[placeholder="City"]`).fill("Carlsbad");
  await page.locator('#Select1').selectOption({ value: 'CA' });
  await page.locator(`[placeholder="ZIP code"]`).fill("92009");

  await page.locator('[placeholder="First name"]').fill('Test');
  await page.locator('[placeholder="Last name"]').fill('Test');

  // Card Information
  const cardNumberFrame = page.frameLocator('iframe[name*="card-fields-number"]'); // Updated locator
  await cardNumberFrame.locator('[placeholder="Card number"]').fill('370021117538874');

  const expiryFrame = page.frameLocator('iframe[name*="card-fields-expiry"]'); // Updated locator
  await expiryFrame.locator('[placeholder="Expiration date (MM / YY)"]').fill('12/25');

  // CVV iframe using a generalized selector
  const cvvFrame = page.frameLocator('iframe[name*="verification_value"]'); // Updated locator
  await cvvFrame.locator('[placeholder="Security code"]').fill('3356');

  const nameOnCardFrame = page.frameLocator('iframe[name*="card-fields-name"]'); // Updated locator
  await nameOnCardFrame.locator('#name').fill('Sam Venning');

  // Complete Checkout
  await page.locator('#checkout-pay-button').click();

  // Order Summary Verification
  await page.waitForLoadState('load');
  await page.locator('#order-summary').locator('tfoot').waitFor();
  await expect(page.locator('tfoot')).toContainText('$22.34');
  await expect(page.locator('#order-summary')).toContainText('Delivery every 60 Days');
  await expect(page.locator('#order-summary')).toContainText('1');
});

async function checkElementVisibility(page:Page) {
  const guaranteeButton = page.locator('.picker_jc_new__btn_guarantee_wrap');
  const maxAttempts = 5; // Maximum number of attempts
  let attempt = 0;

  while (attempt < maxAttempts) {
      // Check if the element is visible
      const isVisible = await guaranteeButton.isVisible();

      if (isVisible) {
          // Element is visible, exit the loop
          console.log('Element is visible.');
          return; // Exit the function if the element is visible
      } else {
          // If not visible, reload the page and increment the attempt counter
          console.log(`Element not visible. Attempt ${attempt + 1} of ${maxAttempts}. Reloading the page...`);
          await page.waitForTimeout(5000);

          // Wait for 10 seconds before the next attempt
          attempt++;
      }
      await page.reload({ timeout: 60000 });
      await page.waitForTimeout(5000);
  }

  console.log('Element is still not visible after maximum attempts.');
}

const largeBreedsTestCases = [
  {
    dogWeight: DogWeightRange.Over120,
    tubesOption: "1", 
    deliveryFrequency: "Delivery every 15 Days",
    actualPrice: "$26.23",
    noDiscountPrice: "$52.45",
    weightAndProductType: "Some other weight | preventative",
  },
  {
    dogWeight: DogWeightRange.Over120,
    tubesOption: "2", 
    deliveryFrequency: "Delivery every 15 Days",
    actualPrice: "$26.23",
    noDiscountPrice: "$52.45",
    weightAndProductType: "Some other weight | preventative",
  },
  {
    dogWeight: DogWeightRange.Over120,
    tubesOption: "3",
    deliveryFrequency: "Delivery every 45 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "Over 120 lbs | preventative",
  },
];

largeBreedsTestCases.forEach(testCase => {
  test(`Large pets test with weight ${testCase.tubesOption}`, async ({ page }) => {
    console.log("Test is running")
    test.setTimeout(120000);

    await page.goto('https://wuffes.com/pages/quiz');
  
  });
  });
