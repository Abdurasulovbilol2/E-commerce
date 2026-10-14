import { expect, test } from "./fixtures";

test.describe("product catalog", () => {
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.open();
  });

  test("lists all six products", async ({ productsPage }) => {
    await expect(productsPage.inventoryItems).toHaveCount(6);
  });

  test("sorts product names alphabetically", async ({ productsPage }) => {
    await productsPage.sortBy("az");

    const names = await productsPage.productNames.allTextContents();
    expect(names).toEqual(
      [...names].sort((first, second) => first.localeCompare(second)),
    );
  });

  test("sorts product prices from low to high", async ({ productsPage }) => {
    await productsPage.sortBy("lohi");

    const displayedPrices = await productsPage.productPrices.allTextContents();
    const prices = displayedPrices.map((price) =>
      Number(price.replace("$", "")),
    );
    expect(prices).toEqual([...prices].sort((first, second) => first - second));
  });
});
