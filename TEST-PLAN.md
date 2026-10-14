# Test Plan

## 1. Objective

This test plan defines the quality validation approach for the E-Commerce Quality Engineering Framework. The goal is to verify the core user flows of a public e-commerce demo app and expose regressions early through UI and API automation.

## 2. Scope

### In scope

- User authentication
- Catalog browsing and sorting
- Cart add/remove actions
- Checkout validation and successful order completion
- API CRUD and failure-path verification
- Reports and CI execution

### Out of scope

- Production-grade payment processing validation
- Real database integration tests
- Non-browser performance benchmarking

## 3. Test environments

- Local development environment
- GitHub Actions CI runner
- Public demo app: SauceDemo
- Public API: JSONPlaceholder

## 4. Entry criteria

- Node dependencies are installed
- Playwright browsers are available
- The application is reachable
- The demo API is reachable

## 5. Exit criteria

- All critical UI and API tests pass
- Reports and artifacts are generated
- CI workflow completes successfully

## 6. Test strategy summary

- UI validations focus on user behavior and stable DOM interactions
- API tests validate contract behavior and edge cases
- Tests prioritize reliability and maintainability over brittle selectors
- Failure artifacts help accelerate debugging and triage

## 7. Risks and mitigations

- Risk: public demo app changes its UI unexpectedly
  - Mitigation: use resilient selectors and stable test IDs where available
- Risk: API service is rate-limited or temporary
  - Mitigation: keep tests focused and isolate failure scenarios
- Risk: browser timing issues
  - Mitigation: explicit waits, timeouts, and trace collection

## 8. Deliverables

- Automated test suite
- HTML and artifact-based reports
- CI pipeline status on GitHub
- Documentation for execution and troubleshooting
