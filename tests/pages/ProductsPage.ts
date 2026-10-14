import type { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async open() {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.loginAsStandardUser();
  }

  async addBackpack() {
    await this.page.getByTestId("add-to-cart-sauce-labs-backpack").click();
  }

  async addBikeLight() {
    await this.page.getByTestId("add-to-cart-sauce-labs-bike-light").click();
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo") {
    await this.page.getByRole("combobox").selectOption(option);
  }

  async openCart() {
    await this.page.getByTestId("shopping-cart-link").click();
  }

  get shoppingCartBadge() {
    return this.page.getByTestId("shopping-cart-badge");
  }

  get inventoryItems() {
    return this.page.getByTestId("inventory-item");
  }

  get productNames() {
    return this.page.getByTestId("inventory-item-name");
  }

  get productPrices() {
    return this.page.getByTestId("inventory-item-price");
  }
}
