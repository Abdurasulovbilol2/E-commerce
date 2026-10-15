import { PRODUCT_DATA } from "./config/testData";
import { expect, test } from "./fixtures";

test.describe("shopping cart", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open();
  });

  test("adds products to the cart and removes them", async ({
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
  });
});
