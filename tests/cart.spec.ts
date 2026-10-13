import { expect, test } from "@playwright/test";

test.describe("shopping cart", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByTestId("inventory-item").first()).toBeVisible();
  });

  test("adds products to the cart and removes them", async ({ page }) => {
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await page.getByTestId("add-to-cart-sauce-labs-bike-light").click();
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("2");

    await page.getByTestId("shopping-cart-link").click();
    const cartProducts = page.getByRole("button", {
      name: /^View details for /,
    });
    await expect(cartProducts).toHaveCount(2);
    await expect(
      page.getByRole("button", {
        name: "View details for Sauce Labs Backpack",
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: "View details for Sauce Labs Bike Light",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Remove" }).first().click();
    await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
    await expect(cartProducts).toHaveCount(1);
    await expect(
      page.getByRole("button", {
        name: "View details for Sauce Labs Bike Light",
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Remove" }).click();
    await expect(cartProducts).toHaveCount(0);
    await expect(page.getByTestId("shopping-cart-badge")).toBeHidden();
  });
});
