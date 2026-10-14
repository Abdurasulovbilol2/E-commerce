import type { Page } from "@playwright/test";

export class CartPage {
  constructor(private readonly page: Page) {}

  get shoppingCartBadge() {
    return this.page.getByTestId("shopping-cart-badge");
  }

  get productButtons() {
    return this.page.getByRole("button", { name: /^View details for / });
  }

  productButton(name: string) {
    return this.page.getByRole("button", { name: `View details for ${name}` });
  }

  get removeButtons() {
    return this.page.getByRole("button", { name: "Remove" });
  }

  async open() {
    await this.page.getByTestId("shopping-cart-link").click();
  }

  async removeFirstProduct() {
    await this.removeButtons.first().click();
  }

  async removeLastVisibleProduct() {
    await this.removeButtons.click();
  }
}
