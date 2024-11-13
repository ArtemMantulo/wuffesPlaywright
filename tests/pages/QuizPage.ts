import { Page } from 'playwright';

export class QuizPage {
  constructor(readonly page: Page) {}

  // Pet Name
  private readonly petNameInput = this.page.locator('[placeholder="Pet name"]');
  
  // Age
  private readonly ageInput = this.page.locator('[placeholder="Age"]');
  
  // Breed
  private readonly breedInput = this.page.locator('[placeholder="Start Typing Here"]');

  
  // Quiz Options
  private readonly justRightLabel = this.page.locator(`.icon-dog-body-type-3`);
  private readonly yesLabel = this.page.locator(`label[for='joint-issues_1']`);

  // Email Input
  private readonly emailInput = this.page.locator('[placeholder="Email"]');

  // Results Button
  private readonly resultsBtn = this.page.locator(`quiz-step[quiz-step-index="9"] input[type="submit"]`);

  // Progress Bar
  private readonly progressBar = this.page.locator('.loading-screen');

  // Proceed Button

  //input[@id = 'offer_sub_2']//ancestor::div[@class='col-12 offer_column']

  readonly itemNewPriceByTubsAmount = (tubesAmount: string) => 
    this.page.locator(`//span[@id = 'js__interval_price_new_sub_${tubesAmount}']`);

  readonly selectDogWeight = (weight: string) => 
    this.page.locator(`.quiz-step__contents .quiz-step__radio-label--fill`).filter({ hasText: weight }).click();

  readonly selectDogAbilityToClimbUp = (ability: string) => 
    this.page.locator(`quiz-step[quiz-step-index = "6"] 
      .quiz-step__radio-wrap--multi_grid 
      .quiz-step__radio-label`)
      .filter({ hasText: ability }).click();

  readonly selectDogAbilityToJumpOn = (ability: string) => 
    this.page.locator(`quiz-step[quiz-step-index = "7"] 
      .quiz-step__radio-wrap--multi_grid 
      .quiz-step__radio-label`)
      .filter({ hasText: ability }).click();

  readonly selectDogAbilityToGetUp = (ability: string) => 
    this.page.locator(`quiz-step[quiz-step-index = "8"] 
      .quiz-step__radio-wrap--multi_grid 
      .quiz-step__radio-label`)
      .filter({ hasText: ability }).click();
  
  readonly itemOldPriceByTubsAmount = (tubesAmount: string) => 
    this.page.locator(`//span[@id = 'js__interval_price_old_sub_${tubesAmount}']`);

  private readonly continueButton = this.page.locator('input.quiz-step__next-btn.button--primary[animate]');

  readonly getContinueButtonLocator = (stepIndex: string) => 
    this.page.locator(`quiz-step[quiz-step-index="${stepIndex}"] input[type="submit"][value="CONTINUE"]`);

  async fillPetName(name: string) {
    await this.petNameInput.click();
    await this.petNameInput.fill(name);
    await this.getContinueButtonLocator("0").click();
  }

  async fillAge(age: string) {
    await this.ageInput.click();
    await this.ageInput.fill(age);
    await this.getContinueButtonLocator("1").click();
  }

  async fillBreed(breed: string) {
    await this.breedInput.click();
    await this.breedInput.fill(breed);
    await this.getContinueButtonLocator("2").click();
  }


  async selectJustRight() {
    await this.page.waitForTimeout(2000);
    await this.justRightLabel.click();
  }

  async answerQuizQuestions() {
    await this.yesLabel.click();
    await this.selectDogAbilityToClimbUp("No Problem")
    await this.getContinueButtonLocator("6").click();

    await this.selectDogAbilityToJumpOn("No Problem")
    await this.getContinueButtonLocator("7").click();

    await this.selectDogAbilityToGetUp("No Problem")
    await this.getContinueButtonLocator("8").click();
  }

  async fillEmail(email: string) {
    await this.emailInput.click();
    await this.emailInput.fill(email);
    await this.resultsBtn.click();
  }

  async waitForProgressBar() {
    await this.page.waitForTimeout(10000);
    await this.progressBar.waitFor({ state: 'detached', timeout: 15000 });
  }

  async acceptOffer() {
    await this.page.locator('popup-picker-opener .offer__button').click();
  }
}