# E-Commerce Quality Engineering Framework

A TypeScript and Playwright portfolio project for validating an e-commerce demo application. Phase 1 establishes the browser test runner and a smoke test against [SauceDemo](https://www.saucedemo.com/), a public application intended for testing.

## Phase 1 setup

Prerequisites: Node.js 20 or newer, npm, and network access to install packages, the Playwright browser, and SauceDemo. Git is recommended for version control.

```bash
npm install
npx playwright install chromium
npm test
```

The test confirms that the demo store opens and exposes its login form. To run it visibly in a browser, use `npm run test:headed`. To open Playwright's interactive runner, use `npm run test:ui`.

## Reports and configuration

The HTML report is generated at `playwright-report/` after a test run. Open it with `npm run report`. Screenshots and traces are captured on test failure under `test-results/`.

Set `BASE_URL` to run against another compatible demo environment; the default is `https://www.saucedemo.com`.

## Planned framework shape

As later phases are completed, UI and API tests will be separated, with page objects, reusable fixtures, API clients, common utilities, and test data kept in their own focused areas. This starter intentionally avoids introducing those abstractions before there are workflows to support them.
