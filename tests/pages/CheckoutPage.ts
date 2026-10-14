import type { Page } from "@playwright/test";

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  get firstNameInput() {
    return this.page.getByTestId("firstName");
  }

  get lastNameInput() {
    return this.page.getByTestId("lastName");
  }

  get postalCodeInput() {
    return this.page.getByTestId("postalCode");
  }

  get continueButton() {
    return this.page.getByTestId("continue");
  }

  get finishButton() {
    return this.page.getByTestId("finish");
  }

  get errorMessage() {
    return this.page.getByTestId("error");
  }

  async startCheckout() {
    await this.page.getByTestId("checkout").click();
  }

  async fillCustomerInfo(
    firstName: string,
    lastName: string,
    postalCode: string,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
