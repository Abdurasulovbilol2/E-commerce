import { expect, test } from "@playwright/test";

test.describe("checkout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await page.getByTestId("shopping-cart-link").click();
    await page.getByTestId("checkout").click();
    await expect(page.getByTestId("firstName")).toBeVisible();
  });

  test("requires a first name", async ({ page }) => {
    await page.getByTestId("continue").click();

    await expect(page.getByTestId("error")).toContainText(
      "First Name is required",
    );
  });

  test("requires a last name", async ({ page }) => {
    await page.getByTestId("firstName").fill("Taylor");
    await page.getByTestId("postalCode").fill("10001");
    await page.getByTestId("continue").click();

    await expect(page.getByTestId("error")).toContainText(
      "Last Name is required",
    );
  });

  test("requires a postal code", async ({ page }) => {
    await page.getByTestId("firstName").fill("Taylor");
    await page.getByTestId("lastName").fill("Tester");
    await page.getByTestId("continue").click();

    await expect(page.getByTestId("error")).toContainText(
      "Postal Code is required",
    );
  });

  test("places an order for a cart item", async ({ page }) => {
    await page.getByTestId("firstName").fill("Taylor");
    await page.getByTestId("lastName").fill("Tester");
    await page.getByTestId("postalCode").fill("10001");
    await page.getByTestId("continue").click();

    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(
      page.getByRole("button", {
        name: "View details for Sauce Labs Backpack",
      }),
    ).toBeVisible();
    await expect(page.getByText("Total: $32.39")).toBeVisible();
    await page.getByTestId("finish").click();

    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(
      page.getByText("Thank you for your order!", { exact: true }),
    ).toBeVisible();
  });
});
