import { expect, test } from "./fixtures";

test.describe("login", () => {
  test("allows a standard user to sign in", async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(loginPage.inventoryItems.first()).toBeVisible();
  });

  test("shows an error for invalid credentials", async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login("invalid_user", "invalid_password");

    await expect(loginPage.errorMessage).toContainText(
      "Username and password do not match",
    );
    await expect(page).toHaveURL(/\/$/);
  });
});
