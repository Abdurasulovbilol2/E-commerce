import type { Page } from "@playwright/test";
import { TEST_USERS } from "../config/testData";

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
    const { username, password } = TEST_USERS.standardUser;
    await this.login(username, password);
  }

  async loginAsLockedOutUser() {
    const { username, password } = TEST_USERS.lockedOutUser;
    await this.login(username, password);
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
