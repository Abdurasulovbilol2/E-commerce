import { PRODUCT_DATA } from "./config/testData";
import { expect, test } from "./fixtures";

test.describe("shopping cart", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open();
  });

  test("adds products to the cart and removes them", async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.addBackpack();
    await productsPage.addBikeLight();
    await expect(productsPage.shoppingCartBadge).toHaveText("2");

    await productsPage.openCart();
    const cartProducts = cartPage.productButtons;
    await expect(cartProducts).toHaveCount(2);
    await expect(
      cartPage.productButton(PRODUCT_DATA.backpack.name),
    ).toBeVisible();
    await expect(
      cartPage.productButton(PRODUCT_DATA.bikeLight.name),
    ).toBeVisible();

    await cartPage.removeFirstProduct();
    await expect(cartPage.shoppingCartBadge).toHaveText("1");
    await expect(cartProducts).toHaveCount(1);
    await expect(
      cartPage.productButton(PRODUCT_DATA.bikeLight.name),
    ).toBeVisible();

    await cartPage.removeLastVisibleProduct();
    await expect(cartProducts).toHaveCount(0);
    await expect(cartPage.shoppingCartBadge).toBeHidden();

    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.shoppingCartBadge).toBeHidden();
    await expect(
      page.getByTestId(PRODUCT_DATA.backpack.addToCartId),
    ).toBeVisible();
    await expect(
      page.getByTestId(PRODUCT_DATA.bikeLight.addToCartId),
    ).toBeVisible();
  });

  test("preserves cart contents when returning to the catalog", async ({
    page,
    productsPage,
    cartPage,
  }) => {
    await productsPage.addBackpack();
    await productsPage.openCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(productsPage.shoppingCartBadge).toHaveText("1");
    await expect(page.getByRole("button", { name: "Remove" })).toBeVisible();

    await productsPage.openCart();
    await expect(cartPage.productButtons).toHaveCount(1);
    await expect(cartPage.productButtons.first()).toBeVisible();
  });
});
