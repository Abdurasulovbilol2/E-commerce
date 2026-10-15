import { PRODUCT_DATA } from "./config/testData";
import { expect, test } from "./fixtures";

test.describe("checkout", () => {
  test.beforeEach(async ({ productsPage, checkoutPage }) => {
    await productsPage.open();
    await productsPage.addBackpack();
    await productsPage.openCart();
    await checkoutPage.startCheckout();
    await expect(checkoutPage.firstNameInput).toBeVisible();
  });

  test("requires a first name", async ({ checkoutPage }) => {
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toContainText(
      "First Name is required",
    );
  });

  test("requires a last name", async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerInfo("Taylor", "", "10001");
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toContainText(
      "Last Name is required",
    );
  });

  test("requires a postal code", async ({ checkoutPage }) => {
    await checkoutPage.fillCustomerInfo("Taylor", "Tester", "");
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toContainText(
      "Postal Code is required",
    );
  });

  test("places an order for a cart item", async ({ page, checkoutPage }) => {
    await checkoutPage.fillCustomerInfo("Taylor", "Tester", "10001");
    await checkoutPage.continue();

    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(
      page.getByRole("button", {
        name: `View details for ${PRODUCT_DATA.backpack.name}`,
      }),
    ).toBeVisible();
    await expect(page.getByText("Total: $32.39")).toBeVisible();
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(
      page.getByText("Thank you for your order!", { exact: true }),
    ).toBeVisible();
  });

  test("allows a user to cancel checkout and return to the product catalog", async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.fillCustomerInfo("Taylor", "Tester", "10001");
    await checkoutPage.continue();

    await page.getByTestId("cancel").click();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(page.getByText("Products")).toBeVisible();
  });
});
