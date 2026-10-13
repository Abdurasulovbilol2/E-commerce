import { expect, test } from "@playwright/test";

test("shows the demo store login form", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Swag Labs", { exact: true })).toBeVisible();
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
