import { expect, test } from "@playwright/test";

test("logs execution details and verifies the login page loads", async ({
  page,
}, testInfo) => {
  console.log(`Starting test: ${testInfo.title}`);
  console.log(`Project: ${testInfo.project.name}`);

  await page.goto("/");
  console.log(`Page loaded: ${page.url()}`);

  await expect(page.getByText("Swag Labs", { exact: true })).toBeVisible();
  console.log(
    "Swag Labs branding is visible. Reporting artifacts are being retained for failure analysis.",
  );
});
