import { expect, test } from "@playwright/test";

test.describe("product catalog", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByTestId("inventory-item").first()).toBeVisible();
  });

  test("lists all six products", async ({ page }) => {
    await expect(page.getByTestId("inventory-item")).toHaveCount(6);
  });

  test("sorts product names alphabetically", async ({ page }) => {
    await page.getByRole("combobox").selectOption("az");

    const names = await page
      .getByTestId("inventory-item-name")
      .allTextContents();
    expect(names).toEqual(
      [...names].sort((first, second) => first.localeCompare(second)),
    );
  });

  test("sorts product prices from low to high", async ({ page }) => {
    await page.getByRole("combobox").selectOption("lohi");

    const displayedPrices = await page
      .getByTestId("inventory-item-price")
      .allTextContents();
    const prices = displayedPrices.map((price) =>
      Number(price.replace("$", "")),
    );
    expect(prices).toEqual([...prices].sort((first, second) => first - second));
  });
});
