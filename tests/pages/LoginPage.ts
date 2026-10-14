import type { Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder("Username").fill(username);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async loginAsStandardUser() {
    await this.login("standard_user", "secret_sauce");
  }

  get usernameInput() {
    return this.page.getByPlaceholder("Username");
  }

  get passwordInput() {
    return this.page.getByPlaceholder("Password");
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }

  get inventoryItems() {
    return this.page.getByTestId("inventory-item");
  }

  get errorMessage() {
    return this.page.getByTestId("error");
  }
}
