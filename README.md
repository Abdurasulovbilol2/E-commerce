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

## Phase 2: Login and products

The login tests cover a successful standard-user login and rejection of invalid credentials. Product tests verify the six-item catalog, alphabetical sorting, and ascending price sorting. SauceDemo's public demo credentials are used only for these demo tests; no private credentials are stored.

Run just the Phase 2 tests with:

```bash
npx playwright test tests/login.spec.ts tests/products.spec.ts
```

Playwright is configured to treat SauceDemo's `data-test` attributes as test IDs, so tests can use `getByTestId` for its stable catalog hooks.

## Phase 3: Cart and checkout

Cart coverage verifies adding two products, their cart contents and count, removing each product, and the empty-cart state. Checkout coverage verifies the required first name, last name, and postal code fields, then completes an order for one item.

Run just the Phase 3 tests with:

```bash
npx playwright test tests/cart.spec.ts tests/checkout.spec.ts
```

## Phase 4: Page Object Model and reusable fixtures

This phase introduces page objects for the login, catalog, cart, and checkout flows, plus a reusable Playwright fixture layer in `tests/fixtures.ts`. The goal is to centralize page interactions, reduce duplication, and keep test scenarios readable for interview and maintenance purposes.

Run just the Phase 4 tests with:

```bash
npx playwright test tests/login.spec.ts tests/products.spec.ts tests/cart.spec.ts tests/checkout.spec.ts
```

## Phase 5: API automation

This phase adds a dedicated API test layer built with Playwright's request API against the public JSONPlaceholder service. The suite covers GET, POST, PUT, PATCH, DELETE, schema validation, response status checks, and a missing-resource 404 scenario. The API layer is separated from the UI automation and kept in `tests/api/` to preserve a clean architecture.

Run just the API tests with:

```bash
npx playwright test tests/api/posts-api.spec.ts
```

## Phase 6: Reporting and debugging

This phase hardens the project for troubleshooting and evidence collection. Playwright is configured to retain HTML reports, screenshots, videos, and traces for failures. Console logging around key steps gives immediate execution context during a failing run, and the suite now keeps failure artifacts under `test-results/` and the HTML report under `playwright-report/`.

Run just the debugging/reporting smoke test with:

```bash
npx playwright test tests/debugging.spec.ts
```

## Phase 7: GitHub Actions CI/CD

This project includes a GitHub Actions workflow that installs dependencies, installs the required Playwright browser, runs the automated suite, and uploads the HTML report and failure artifacts for debugging.

The workflow runs on pushes and pull requests to `main` and fails the job when any Playwright test fails. The workflow file is located at `.github/workflows/playwright.yml`.

Local equivalent commands:

```bash
npm ci
npx playwright install --with-deps chromium
npm test
```

## Reports and configuration

The HTML report is generated at `playwright-report/` after a test run. Open it with `npm run report`. Screenshots, videos, and traces are retained on failure under `test-results/`, and the list reporter prints a concise console summary for each run.

Set `BASE_URL` to run against another compatible demo environment; the default is `https://www.saucedemo.com`.

## Planned framework shape

As later phases are completed, UI and API tests will be separated, with page objects, reusable fixtures, API clients, common utilities, and test data kept in their own focused areas. This starter intentionally avoids introducing those abstractions before there are workflows to support them.
