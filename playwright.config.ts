import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
import { environment } from "./tests/config/environment";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  expect: {
    timeout: 15000,
  },
  reporter: [
    ["list"],
    [
      "html",
      {
        open: "never",
        outputFolder: "playwright-report",
        reportName: "ecommerce-quality-report",
      },
    ],
  ],
  use: {
    baseURL: environment.BASE_URL,
    testIdAttribute: "data-test",
    ...devices["Desktop Chrome"],
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  outputDir: "./test-results",
});
