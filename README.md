# Ionic Theme iOS26

A CSS/JS theme library that applies iOS26 design system to Ionic applications.

![](screenshots/ios26.png)

DEMO is here: https://ionic-theme-ios26.netlify.app/

## Overview

This library provides CSS/JS files that bring the iOS26 design system to Ionic applications. It updates the look and feel of Ionic components to match the latest iOS26 design guidelines.

## 💖 Support This Project

Enjoying this library? Your support helps keep it alive and growing!  
Sponsoring means you directly contribute to new features, improvements, and maintenance.

[Become a Sponsor →](https://github.com/sponsors/rdlabo)

## Setup

This is a CSS theme for extending your Ionic project. It does not work on its own, so use it together with the Ionic Framework.

```bash
npm install @rdlabo/ionic-theme-ios26
```

And import the theme in your project's main CSS file (e.g., `src/styles.scss`).

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/default-variables.css';
@import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26.css';

/**
 * This file is to eliminate the impact of class name changes for iOS26.
 * For example, `ion-buttons ion-button[fill=default]` is not normally implemented, but may be required for iOS26.
 * This file is to eliminate such effects.
 */
@import '@rdlabo/ionic-theme-ios26/dist/css/md-remove-ios-class-effect.css';

/**
 * If you will use the design of ion-item-group with ion-list on Android as well, import it.
 * More info: https://github.com/rdlabo-team/ionic-theme-ios26/blob/main/USING_ION_ITEM_GROUP.md
 * @import '@rdlabo/ionic-theme-ios26/dist/css/md-ion-list-inset.css';
 */

/*
 * Support Dark Mode
 * We support Ionic Dark Mode. More information is here: https://ionicframework.com/docs/theming/dark-mode
 * use Always:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26-dark-always.css'
 * use System:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26-dark-system.css'
 * use CSS Class: @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26-dark-class.css'
 */
```

## Customization

### CSS Variables

To customize the library's default styles to match your design, several CSS variables are provided. See this file for details:
https://github.com/rdlabo-team/ionic-theme-ios26/blob/main/src/styles/default-variables.scss


## Features

### `.ios26-disabled` Class

Add the `.ios26-disabled` class to disable the iOS26 theme on specific components.

```html
<!-- iOS26 theme applied -->
<ion-button>iOS26 Design</ion-button>

<!-- Standard Ionic iOS styling -->
<ion-button class="ios26-disabled">Standard Ionic Design</ion-button>
```

### Liquid Glass Mixin

Import the SCSS files from the main package to use the liquid glass mixin.

```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/api.scss';

ion-textarea label.textarea-wrapper {
  @include api.glass-background;
}
```

### Additional Design

To achieve higher fidelity to iOS26 design, you can implement additional design provided by this library. For more details, please visit:

https://ionic-theme-ios26.netlify.app/main/docs


### Experimental: Using Gesture Animation with `ion-tab-button` / `ion-segment-button`

__This feature is experimental. The library can be used without this feature.__

By registering `ion-tab-bar` / `ion-segment`, you can display animation effects on `ion-tab-button` / `ion-segment-button`

```js
import { registerTabBarEffect, registerSegmentEffect } from '@rdlabo/ionic-theme-ios26';

/**
 * Register DOM elements. Effects are applied using Ionic Gesture and Ionic Animation.
 */
const registeredTabBarEffect = registerTabBarEffect(document.querySelector<HTMLElement>('ion-tab-bar'));
const registeredSegmentEffect = registerSegmentEffect(document.querySelector<HTMLElement>('ion-segment'));

const destroy = () => {
  /**
   * If the registered DOM element is removed (e.g., due to page navigation),
   * make sure to destroy the gesture and animation. This will also remove the event listeners.
   * You can re-register them if needed.
   */
  registeredTabBarEffect?.destroy();
  registeredSegmentEffect?.destroy();
}
```


## Important Notes

### Using `ion-item-group`

Under specific conditions, you need to use `ion-item-group`.

```diff
  <ion-list inset=true>
    <ion-list-header><ion-label>Label</ion-label></ion-list-header>
+   <ion-item-group>
      <ion-item>...</ion-item>
      <ion-item>...</ion-item>
+   </ion-item-group>
  </ion-list>
```

For details, please refer to [USING_ION_ITEM_GROUP.md](./USING_ION_ITEM_GROUP.md).

### Make `ion-back-button` Smoother

When the following conditions are met, the Ionic Framework programmatically generates and animates the `ion-back-button`:

- The previous page uses `ion-header[collapse='condense']`
- The navigated page has `ion-buttons ion-back-button`

This is not the iOS26 UI behavior. Therefore, we hide the animation by default using `visibility: hidden;`. However, there is still a problem where the original `ion-back-button` disappears at the start and end of the animation. For a smoother experience, you can avoid placing `ion-back-button` inside `ion-buttons`:

```diff
  <ion-header>
-   <ion-buttons slot="start">
-   <ion-back-button></ion-back-button>
-   </ion-buttons>
+   <ion-back-button slot="start"></ion-back-button>
  </ion-header>
```

You can see the difference in the following video. The first example shows `ion-back-button` placed outside of `ion-buttons`, and the second shows the default behavior:

[![Image from Gyazo](https://i.gyazo.com/e196a49d9f2dbd93cd0ebed67c258c73.gif)](https://gyazo.com/e196a49d9f2dbd93cd0ebed67c258c73)

This is a known issue that has been shared with the Ionic team. We will update this library accordingly once Ionic Core addresses it.


## Migration Support

For gradual migration, you can selectively apply the iOS26 theme by importing individual components instead of the full theme file.

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/utils/translucent';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-action-sheet';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-alert';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-breadcrumbs';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-button';
...
```

### Dark Mode with Individual Components

When importing individual components with dark mode support, use SCSS instead of CSS. This is because the selectors differ between `Always`, `System`, and `Class` modes.

> **Note**: Currently, only `ion-button` has separate dark mode styling applied.

Always (Always Dark Mode):
```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/theme-dark';

:root {
    @include theme-dark.default-variables;
}
@include theme-dark.ion-button;
@include theme-dark.ion-fab;
@include theme-dark.ion-tabs;
@include theme-dark.ion-segment;
```

System (Follow System Settings):
```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/theme-dark';

@media (prefers-color-scheme: dark) {
    :root {
        @include theme-dark.default-variables;
    }
    @include theme-dark.ion-button;
    @include theme-dark.ion-fab;
    @include theme-dark.ion-tabs;
    @include theme-dark.ion-segment;
}
```

Class (Toggle with CSS Class):
```scss
@use '@rdlabo/ionic-theme-ios26/src/styles/utils/theme-dark';

.ion-palette-dark {
    @include theme-dark.default-variables;
    @include theme-dark.ion-button;
    @include theme-dark.ion-fab;
    @include theme-dark.ion-tabs;
    @include theme-dark.ion-segment;
}
```

## Development & Testing

### Demo Application

The `demo/` directory contains an Angular application for testing and demonstrating the theme. To run the demo:

```bash
cd demo
npm install
npm start
```

### Visual Regression Testing

We use Playwright for visual regression testing to ensure consistent styling across all components. The test suite automatically captures screenshots of all routes in both light and dark modes.

#### Running Tests

```bash
cd demo

# Run all E2E tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Debug tests
npm run test:e2e:debug

# Update baseline screenshots (when intentionally changing UI)
npm run test:e2e:update
```
