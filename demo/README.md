# Demo Application

This is an Angular-based demo application for the Ionic iOS26 Theme Library.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
# or
ionic serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Testing

### Unit Tests (Karma + Jasmine)

```bash
npm test
```

### E2E Screenshot Tests (Playwright)

This project uses Playwright for visual regression testing. All routes defined in `index.routes.ts` are automatically tested.

#### Run E2E tests

```bash
npm run test:e2e
```

#### Run E2E tests in UI mode (interactive)

```bash
npm run test:e2e:ui
```

#### Debug E2E tests

```bash
npm run test:e2e:debug
```

#### Update baseline screenshots

When you intentionally change the UI and want to update the baseline screenshots:

```bash
npm run test:e2e:update
```

### Test Coverage

The screenshot tests cover:
- All routes in light mode
- All routes in dark mode (`ion-palette-dark` class)
- Full page screenshots for visual regression testing

Test reports are generated in `playwright-report/` directory.

## Project Structure

```
demo/
├── e2e/                      # Playwright E2E tests
│   └── screenshot.spec.ts    # Screenshot tests for all routes
├── src/
│   ├── app/
│   │   └── index/            # Main index routes
│   │       ├── pages/        # All page components
│   │       └── index.routes.ts
│   ├── theme/
│   │   └── theme-ios26.scss  # iOS26 theme
│   └── global.scss
├── playwright.config.ts       # Playwright configuration
└── package.json
```

## Building

```bash
npm run build
```

The build artifacts will be stored in the `www/` directory.

## Capacitor

### iOS

```bash
npm run cap
npx cap open ios
```

## Further Help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

For Ionic Framework, visit [Ionic Documentation](https://ionicframework.com/docs).

For Playwright, visit [Playwright Documentation](https://playwright.dev/).

