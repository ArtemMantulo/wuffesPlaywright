import { expect, test } from '@playwright/test';
import { QuizPage } from '../pages/QuizPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { DogWeightRange } from '../weightValues';
import { OfferPage } from '../pages/OfferPage.page';
import { faker } from '@faker-js/faker';

function generateEmail() {
  const date = faker.date.recent().toISOString().slice(0, 10).replace(/-/g, ''); // Format as YYYYMMDD
  const randomDigits = faker.string.alphanumeric(10);;  // Generates a 7-digit number as a string
  return `automation${date}${randomDigits}@gmail.com`;
};


const smallAndMediumBreedsProductName = "Advanced Hip & Joint Support for Small & Medium Breeds";

const largeBreedsProductName = "Advanced Hip & Joint Support for Large Breeds";

const smallTestData = [
  {
    dogWeight: DogWeightRange.Small,
    tubesOption: "1", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$50.35",
    noDiscountPrice: "$104.90",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.Small,
    tubesOption: "2", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.Small,
    tubesOption: "3",
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "65-100 lbs | preventative",
  },
];

smallTestData.forEach(testData => {
  test(`Pets with ${testData.dogWeight} ${testData.tubesOption} tube(s)`, async ({ page }) => {
  test.setTimeout(120000);
  const quizPage = new QuizPage(page);
  const checkoutPage = new CheckoutPage(page);
  const offerPage = new OfferPage(page);

  await page.goto('https://wuffes.com/pages/quiz');

  const email = generateEmail();

  // Quiz Steps
  await quizPage.fillPetName('Test');
  await quizPage.fillAge('20');
  await quizPage.fillBreed('Akita');
  await quizPage.selectDogWeight(DogWeightRange.Small)
  await quizPage.selectJustRight();
  await quizPage.answerQuizQuestions();
  await quizPage.fillEmail(email);
  console.log(email);
  await quizPage.waitForProgressBar();
  await quizPage.acceptOffer();

  await verifySubscriptionPricesSmallDogs(offerPage);
  await offerPage.buyOnceButton.click();
  await verifyOneTimePricesSmallDogs(offerPage);

  await offerPage.switchToSubButton.click();
  await offerPage.proceedButton.click();


  // Checkout Steps
  await expect.soft(await checkoutPage.getDeliveryFrequency(smallAndMediumBreedsProductName)).toHaveText("Delivery every 60 Days");
  await expect.soft(await checkoutPage.getActualPriceByProductName(smallAndMediumBreedsProductName)).toHaveText("$20.74");
  await expect.soft(await checkoutPage.getPriceWithNoDiscountByProductName(smallAndMediumBreedsProductName)).toHaveText("$41.47");
  await expect.soft(await checkoutPage.getWeightAndProductType(smallAndMediumBreedsProductName)).toHaveText("0-35 lbs | preventative");
  
  await checkoutPage.fillCheckoutForm('test@wuffes.com', '2322 La Costa Avenue unit a', 'Artem apartments', 'Carlsbad', 'CA', '92009', 'Test', 'Test');
  
  await expect.soft(checkoutPage.shipping).toHaveText("Free");
});
});

const mediumTestData = [
  {
    dogWeight: DogWeightRange.Medium,
    tubesOption: "1", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$50.35",
    noDiscountPrice: "$104.90",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.Medium,
    tubesOption: "2", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.Medium,
    tubesOption: "3",
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "65-100 lbs | preventative",
  },
];

mediumTestData.forEach(testData => {
  test(`Pets with ${testData.dogWeight} ${testData.tubesOption} tube(s)`, async ({ page }) => {
  test.setTimeout(120000);
  const quizPage = new QuizPage(page);
  const checkoutPage = new CheckoutPage(page);
  const offerPage = new OfferPage(page);

  await page.goto('https://wuffes.com/pages/quiz');

  // Quiz Steps
  await quizPage.fillPetName('Test');
  await quizPage.fillAge('20');
  await quizPage.fillBreed('Akita');
  await quizPage.selectDogWeight(DogWeightRange.Medium)
  await quizPage.selectJustRight();
  await quizPage.answerQuizQuestions();
  await quizPage.fillEmail(generateEmail());
  await quizPage.waitForProgressBar();
  await quizPage.acceptOffer();

  await verifySubscriptionPricesSmallDogs(offerPage);
  await offerPage.buyOnceButton.click();
  await verifyOneTimePricesSmallDogs(offerPage);

  await offerPage.switchToSubButton.click();
  await offerPage.proceedButton.click();

  // Checkout Steps
  await expect.soft(await checkoutPage.getDeliveryFrequency(smallAndMediumBreedsProductName)).toHaveText("Delivery every 60 Days");
  await expect.soft(await checkoutPage.getActualPriceByProductName(smallAndMediumBreedsProductName)).toHaveText("$39.81");
  await expect.soft(await checkoutPage.getPriceWithNoDiscountByProductName(smallAndMediumBreedsProductName)).toHaveText("$82.94");
  await expect.soft(await checkoutPage.getWeightAndProductType(smallAndMediumBreedsProductName)).toHaveText("36-65 lbs | preventative");
  
  await checkoutPage.fillCheckoutForm('test@wuffes.com', '2322 La Costa Avenue unit a', 'Artem apartments', 'Carlsbad', 'CA', '92009', 'Test', 'Test');
  await checkoutPage.verifyShipmentIsFree()
});
});


const largeTestData = [
  {
    dogWeight: DogWeightRange.Large,
    tubesOption: "1", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$50.35",
    noDiscountPrice: "$104.90",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.Large,
    tubesOption: "2", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.Large,
    tubesOption: "3",
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "65-100 lbs | preventative",
  },
];


largeTestData.forEach(testData => {
  test(`Pets with ${testData.dogWeight} ${testData.tubesOption} tube(s)`, async ({ page }) => {
  test.setTimeout(120000);
  const quizPage = new QuizPage(page);
  const checkoutPage = new CheckoutPage(page);
  const offerPage = new OfferPage(page);

  await page.goto('https://wuffes.com/pages/quiz');

  // Quiz Steps
  await quizPage.fillPetName('Test');
  await quizPage.fillAge('20');
  await quizPage.fillBreed('Akita');
  await quizPage.selectDogWeight(DogWeightRange.Large)
  await quizPage.selectJustRight();
  await quizPage.answerQuizQuestions();
  await quizPage.fillEmail(generateEmail());
  await quizPage.waitForProgressBar();
  await quizPage.acceptOffer();

  await verifySubscriptionPricesLargeDogs(offerPage);
  await offerPage.buyOnceButton.click();
  await verifyOneTimePricesLargeDogs(offerPage);

  await offerPage.switchToSubButton.click();
  await offerPage.proceedButton.click();

  // Checkout Steps
  await expect.soft(await checkoutPage.getDeliveryFrequency(largeBreedsProductName)).toHaveText("Delivery every 60 Days");
  await expect.soft(await checkoutPage.getActualPriceByProductName(largeBreedsProductName)).toHaveText("$50.35");
  await expect.soft(await checkoutPage.getPriceWithNoDiscountByProductName(largeBreedsProductName)).toHaveText("$104.90");
  await expect.soft(await checkoutPage.getWeightAndProductType(largeBreedsProductName)).toHaveText("65-100 lbs | preventative");
  
  
  await checkoutPage.fillCheckoutForm('test@wuffes.com', '2322 La Costa Avenue unit a', 'Artem apartments', 'Carlsbad', 'CA', '92009', 'Test', 'Test');
  await checkoutPage.verifyShipmentIsFree()
});
});



const extraLargeTestData = [
  {
    dogWeight: DogWeightRange.ExtraLarge,
    tubesOption: "1", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.ExtraLarge,
    tubesOption: "2", 
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "100-120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.ExtraLarge,
    tubesOption: "3",
    deliveryFrequency: "Delivery every 60 Days",
    actualPrice: "$66.09",
    noDiscountPrice: "$157.35",
    weightAndProductType: "100-120 lbs | preventative",
  },
];


extraLargeTestData.forEach(testData => {
test(`Pets with ${testData.dogWeight} ${testData.tubesOption} tube(s)`, async ({ page }) => {
  test.setTimeout(120000);
  const quizPage = new QuizPage(page);
  const checkoutPage = new CheckoutPage(page);
  const offerPage = new OfferPage(page);

  await page.goto('https://wuffes.com/pages/quiz');

  // Quiz Steps
  await quizPage.fillPetName('Test');
  await quizPage.fillAge('20');
  await quizPage.fillBreed('Akita');
  await quizPage.selectDogWeight(DogWeightRange.ExtraLarge)
  await quizPage.selectJustRight();
  await quizPage.answerQuizQuestions();
  await quizPage.fillEmail(generateEmail());
  await quizPage.waitForProgressBar();
  await quizPage.acceptOffer();

  await verifySubscriptionPricesLargeDogs(offerPage);
  await offerPage.buyOnceButton.click();
  await verifyOneTimePricesLargeDogs(offerPage);

  await offerPage.switchToSubButton.click();
  await offerPage.proceedButton.click();

  // Checkout Steps
  await expect.soft(await checkoutPage.getDeliveryFrequency(largeBreedsProductName)).toHaveText(testData.deliveryFrequency);
  await expect.soft(await checkoutPage.getActualPriceByProductName(largeBreedsProductName)).toHaveText(testData.actualPrice);
  await expect.soft(await checkoutPage.getPriceWithNoDiscountByProductName(largeBreedsProductName)).toHaveText(testData.noDiscountPrice);
  await expect.soft(await checkoutPage.getWeightAndProductType(largeBreedsProductName)).toHaveText(testData.weightAndProductType);
  
  
  await checkoutPage.fillCheckoutForm('test@wuffes.com', '2322 La Costa Avenue unit a', 'Artem apartments', 'Carlsbad', 'CA', '92009', 'Test', 'Test');
  await checkoutPage.verifyShipmentIsFree()
});
});



const over120TestData = [
  {
    dogWeight: DogWeightRange.Over120,
    tubesOption: "1", 
    deliveryFrequency: "Delivery every 15 Days",
    actualPrice: "$26.23",
    noDiscountPrice: "$52.45",
    weightAndProductType: "Over 120 lbs | preventative",
  },
  {
    dogWeight: DogWeightRange.Over120,
    tubesOption: "2", 
    deliveryFrequency: "Delivery every 30 Days",
    actualPrice: "$50.35",
    noDiscountPrice: "$104.90",
    weightAndProductType: "Over 120 lbs | preventative",
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

over120TestData.forEach(testData => {
test(`Pets with ${testData.dogWeight} ${testData.tubesOption} tube(s)`, async ({ page }) => {
  console.log("Test is running")
  test.setTimeout(120000);
  const quizPage = new QuizPage(page);
  const checkoutPage = new CheckoutPage(page);
  const offerPage = new OfferPage(page);

  await page.goto('https://wuffes.com/pages/quiz');

  // Quiz Steps
  await quizPage.fillPetName('Test');
  await quizPage.fillAge('20');
  await quizPage.fillBreed('Akita');
  await quizPage.selectDogWeight(DogWeightRange.Over120);
  await quizPage.selectJustRight();
  await quizPage.answerQuizQuestions();
  await quizPage.fillEmail(generateEmail());
  await quizPage.waitForProgressBar();
  await quizPage.acceptOffer();


  await offerPage.pickerCircleByValueForSub(testData.tubesOption, offerPage.subscriptionOfferContainer).click();
  await offerPage.verifyPickerIsSelected(offerPage.pickerCircleByValueForSub(testData.tubesOption, offerPage.subscriptionOfferContainer));

  await verifySubscriptionPricesLargeDogs(offerPage);
  await offerPage.buyOnceButton.click();
  await verifyOneTimePricesLargeDogs(offerPage);

  await offerPage.switchToSubButton.click();
  await offerPage.proceedButton.click();

  // Checkout Steps
  await expect.soft(await checkoutPage.getDeliveryFrequency(largeBreedsProductName)).toHaveText(testData.deliveryFrequency);
  await expect.soft(await checkoutPage.getActualPriceByProductName(largeBreedsProductName)).toHaveText(testData.actualPrice);
  await expect.soft(await checkoutPage.getPriceWithNoDiscountByProductName(largeBreedsProductName)).toHaveText(testData.noDiscountPrice);
  await expect.soft(await checkoutPage.getWeightAndProductType(largeBreedsProductName)).toHaveText(testData.weightAndProductType);
  
  
  await checkoutPage.fillCheckoutForm('test@wuffes.com', '2322 La Costa Avenue unit a', 'Artem apartments', 'Carlsbad', 'CA', '92009', 'Test', 'Test');
  await checkoutPage.verifyShipmentIsFree();
});
});

async function verifyOneTimePricesLargeDogs(offerPage: OfferPage) {
  await expect.soft(offerPage.pickerPriceByValueForOneTime("6", offerPage.oneTimeOfferContainer)).toHaveText("$236.03");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("6", offerPage.oneTimeOfferContainer)).toHaveText("$314.70");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("5", offerPage.oneTimeOfferContainer)).toHaveText("$209.80");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("5", offerPage.oneTimeOfferContainer)).toHaveText("$262.25");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("4", offerPage.oneTimeOfferContainer)).toHaveText("$178.33");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("4", offerPage.oneTimeOfferContainer)).toHaveText("$209.80");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("3", offerPage.oneTimeOfferContainer)).toHaveText("$141.62");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("3", offerPage.oneTimeOfferContainer)).toHaveText("$157.35");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("2", offerPage.oneTimeOfferContainer)).toHaveText("$99.66");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("2", offerPage.oneTimeOfferContainer)).toHaveText("$104.90");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("1", offerPage.oneTimeOfferContainer)).toHaveText("$52.45");
}

async function verifyOneTimePricesSmallDogs(offerPage: OfferPage) {
  await expect.soft(offerPage.pickerPriceByValueForOneTime("6", offerPage.oneTimeOfferContainer)).toBeVisible()

  await expect.soft(offerPage.pickerPriceByValueForOneTime("6", offerPage.oneTimeOfferContainer)).toHaveText("$186.62");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("6", offerPage.oneTimeOfferContainer)).toHaveText("$248.82");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("5", offerPage.oneTimeOfferContainer)).toHaveText("$165.88");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("5", offerPage.oneTimeOfferContainer)).toHaveText("$207.35");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("4", offerPage.oneTimeOfferContainer)).toHaveText("$141.00");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("4", offerPage.oneTimeOfferContainer)).toHaveText("$165.88");


  await expect.soft(offerPage.pickerPriceByValueForOneTime("3", offerPage.oneTimeOfferContainer)).toHaveText("$111.97");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("3", offerPage.oneTimeOfferContainer)).toHaveText("$124.41");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("2", offerPage.oneTimeOfferContainer)).toHaveText("$78.80");
  await expect.soft(offerPage.pickerOldPriceByValueForOneTime("2", offerPage.oneTimeOfferContainer)).toHaveText("$82.94");

  await expect.soft(offerPage.pickerPriceByValueForOneTime("1", offerPage.oneTimeOfferContainer)).toHaveText("$41.47");
}

async function verifySubscriptionPricesLargeDogs(offerPage: OfferPage) {
  await expect.soft(offerPage.pickerPriceByValueForSub("3", offerPage.subscriptionOfferContainer)).toHaveText("$66.09");
  await expect.soft(offerPage.pickerOldPriceByValueForSub("3", offerPage.subscriptionOfferContainer)).toHaveText("$157.35");

  await expect.soft(offerPage.pickerPriceByValueForSub("2", offerPage.subscriptionOfferContainer)).toHaveText("$50.36");
  await expect.soft(offerPage.pickerOldPriceByValueForSub("2", offerPage.subscriptionOfferContainer)).toHaveText("$104.90");

  await expect.soft(offerPage.pickerPriceByValueForSub("1", offerPage.subscriptionOfferContainer)).toHaveText("$26.23");
  await expect.soft(offerPage.pickerOldPriceByValueForSub("1", offerPage.subscriptionOfferContainer)).toHaveText("$52.45");
}

async function verifySubscriptionPricesSmallDogs(offerPage: OfferPage) {
  await expect.soft(offerPage.pickerPriceByValueForSub("3", offerPage.subscriptionOfferContainer)).toHaveText("$52.26");
  await expect.soft(offerPage.pickerOldPriceByValueForSub("3", offerPage.subscriptionOfferContainer)).toHaveText("$124.41");

  await expect.soft(offerPage.pickerPriceByValueForSub("2", offerPage.subscriptionOfferContainer)).toHaveText("$39.82");
  await expect.soft(offerPage.pickerOldPriceByValueForSub("2", offerPage.subscriptionOfferContainer)).toHaveText("$82.94");

  await expect.soft(offerPage.pickerPriceByValueForSub("1", offerPage.subscriptionOfferContainer)).toHaveText("$20.74");
  await expect.soft(offerPage.pickerOldPriceByValueForSub("1", offerPage.subscriptionOfferContainer)).toHaveText("$41.47");
}

