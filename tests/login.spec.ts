import { expect, test } from "@playwright/test";

test.describe("login", () => {
  test("allows a standard user to sign in", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByTestId("inventory-item").first()).toBeVisible();
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    await page.goto("/");
    await page.getByPlaceholder("Username").fill("invalid_user");
    await page.getByPlaceholder("Password").fill("invalid_password");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByTestId("error")).toContainText(
      "Username and password do not match",
    );
    await expect(page).toHaveURL(/\/$/);
  });
});
