# E2E Screenshot Testing Guide

This document explains how to use the Playwright-based screenshot testing system for the Ionic iOS26 Theme Demo application.

## Overview

The E2E test suite uses Playwright to capture full-page screenshots of all routes in the demo application. This ensures visual consistency and helps catch unintended UI changes.

## Test Coverage

### Routes Tested
All routes defined in `src/app/index/index.routes.ts` are automatically tested:

- Index (main page)
- Action Sheet
- Alert
- Button
- Checkbox
- Range
- Toast
- Toggle
- Segment
- Modal
- Card
- Chip
- Breadcrumbs
- Searchbar
- Popover
- Progress Indicators
- Floating Action Button
- Select
- Radio
- Date and Time Pickers
- Accordion
- Inputs
- Item List
- Reorder
- Tabs
- Toolbar

### Test Modes
Each route is tested in two modes:
- **Light Mode**: Default Ionic styling
- **Dark Mode**: With `ion-palette-dark` class applied

**Total Tests**: 26 routes × 2 modes = **52 screenshot tests**

## Running Tests

### Prerequisites

Make sure you have installed all dependencies:

```bash
npm install
```

Playwright browsers will be automatically installed when needed, or you can install them manually:

```bash
npx playwright install chromium
```

### Test Commands

#### Run all tests
```bash
npm run test:e2e
```

#### Interactive UI mode
Run tests with Playwright's interactive UI:
```bash
npm run test:e2e:ui
```

#### Debug mode
Step through tests with debugging tools:
```bash
npm run test:e2e:debug
```

#### Update screenshots
When you intentionally change the UI and need to update baseline screenshots:
```bash
npm run test:e2e:update
```

#### Run in Docker (same as CI)
To run tests in the same Linux environment as GitHub Actions (using the same Docker image):

**Run tests in Docker**:
```bash
npm run test:e2e:docker
```

**Update screenshots in Docker**:
```bash
npm run test:e2e:docker:update
```

These commands will:
1. Mount the project root into the Docker container
2. Install dependencies
3. Start the development server inside Docker
4. Run Playwright tests
5. Clean up automatically

This ensures your local test results match the CI environment exactly, including font rendering and browser behavior differences between macOS and Linux.

## Understanding Test Results

### Passing Tests
When a test passes, it means the current screenshot matches the baseline screenshot stored in `e2e/screenshot.spec.ts-snapshots/`.

### Failing Tests
When a test fails, it indicates a visual difference between the current and baseline screenshots. This could be:
- An intentional UI change (update baselines with `npm run test:e2e:update`)
- An unintended regression (fix the issue and re-run tests)

### Test Reports
After running tests, you can view detailed HTML reports:
```bash
npx playwright show-report
```

## CI/CD Integration

The E2E tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop` branches

See `.github/workflows/e2e-tests.yml` for the CI configuration.

### Viewing CI Results
When tests fail in CI:
1. Check the GitHub Actions workflow results
2. Download the `playwright-report` artifact to view the full report
3. Download the `test-results` artifact to see actual vs expected screenshots

## File Structure

```
demo/
├── e2e/
│   ├── screenshot.spec.ts              # Test specifications
│   └── screenshot.spec.ts-snapshots/   # Baseline screenshots (committed to git)
├── playwright-report/                  # Test reports (gitignored)
├── test-results/                       # Failed test artifacts (gitignored)
└── playwright.config.ts                # Playwright configuration
```

## Best Practices

1. **Review visual changes carefully** before updating baselines
2. **Run tests locally** before pushing to avoid CI failures
3. **Update baselines only when UI changes are intentional**
4. **Use UI mode** (`npm run test:e2e:ui`) for easier debugging
5. **Check both light and dark mode** when making UI changes

## Troubleshooting

### Tests failing on CI but passing locally
This can happen due to:
- Font rendering differences between macOS and Linux
- Browser behavior differences between operating systems

**Solution**: Update screenshots using Docker to match the CI environment:
```bash
npm run test:e2e:docker:update
```

This uses the same `mcr.microsoft.com/playwright:v1.56.0-noble` Docker image as GitHub Actions and regenerates screenshots in the Linux environment.

### Slow test execution
- The development server takes time to start (configured timeout: 120s)
- Each screenshot capture includes a 500ms wait for animations to complete
- Parallel execution is configured to speed up the process

### Screenshots appear incorrect
1. Ensure the development server is running correctly
2. Check that the route paths match those in `index.routes.ts`
3. Verify the page has fully loaded before screenshot capture

## Updating the Test Suite

### Adding new routes
When adding a new route to `index.routes.ts`, update `e2e/screenshot.spec.ts`:

```typescript
const routes = [
  // ... existing routes
  { path: '/index/new-page', name: 'new-page' },
];
```

Then run:
```bash
npm run test:e2e:update
```

### Modifying test behavior
Edit `playwright.config.ts` to adjust:
- Browser configurations
- Viewport sizes
- Timeout settings
- Screenshot options

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Screenshots Guide](https://playwright.dev/docs/screenshots)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)

