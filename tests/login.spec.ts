import { TEST_USERS } from "./config/testData";
import { expect, test } from "./fixtures";

const invalidCredentials = [
  TEST_USERS.invalidUser,
  { username: "standard_user", password: "wrong_password" },
  { username: "wrong_user", password: "secret_sauce" },
];

test.describe("login", () => {
  test("allows a standard user to sign in", async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(loginPage.inventoryItems.first()).toBeVisible();
  });

  test("blocks a locked out user with a clear error", async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.loginAsLockedOutUser();

    await expect(loginPage.errorMessage).toContainText(
      "Sorry, this user has been locked out.",
    );
    await expect(page).toHaveURL(/\/$/);
  });

  for (const { username, password } of invalidCredentials) {
    test(`shows an error for invalid credentials: ${username}`, async ({
      loginPage,
      page,
    }) => {
      await loginPage.goto();
      await loginPage.login(username, password);

      await expect(loginPage.errorMessage).toContainText(
        "Username and password do not match",
      );
      await expect(page).toHaveURL(/\/$/);
    });
  }
});
