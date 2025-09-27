# Ionic Theme iOS26

A CSS theme library that applies iOS26 design system to Ionic applications.

![](screenshots/ios26.png)

DEMO is here: https://ionic-theme-ios26.netlify.app/

## Overview

This library provides CSS files to apply the iOS26 design system used in real projects to Ionic applications. It customizes the appearance and behavior of Ionic components based on the latest iOS26 design guidelines.

> **⚠️ Under Development**: This library is currently in the development and consideration phase as an OSS project, based on files copied from real projects. We are working on API stability and documentation improvement before full-scale use.

## 💖 Support This Project

Enjoying this project? Your support helps keep it alive and growing!  
Sponsoring means you directly contribute to new features, improvements, and maintenance.

[Become a Sponsor →](https://github.com/sponsors/rdlabo)

## Setup

> **⚠️ Warning**: This library is under development. API changes and breaking changes may occur before full-scale use.

```bash
npm install @rdlabo/ionic-theme-ios26
```

And import the theme in your project's main CSS file (e.g., `src/styles.scss`) and set the `--ios-floating-safe-area-bottom` variable:

```scss
@import '@rdlabo/ionic-theme-ios26/css/ionic-theme-ios26.css';

:root {
  /*
   * This is default value. If you should change value, update this variable.
   * ex) Using admob banner ad.
   *   --ios-floating-safe-area-bottom: calc(max(10px, var(--ion-safe-area-bottom, 0px)) + var(--admob-safe-area, 0px));
   */
  --ios-floating-safe-area-bottom: max(10px, var(--ion-safe-area-bottom, 0px));
}
```

## Important Notes

### Using `ion-item-group`

Under specific conditions, you need to use `ion-item-group`. For details, please refer to [USING_ION_ITEM_GROUP.md](./USING_ION_ITEM_GROUP.md).

### You can also use the liquid glass mixin

You can use the liquid glass mixin by importing SCSS files from the main package.

```scss
@use '@rdlabo/ionic-theme-ios26/src/utils/ios-variables';

ion-textarea label.textarea-wrapper {
  @include ios-variables.glass-background;
}
```

## CSS Utility Classes

### .ios-liquid-glass

Apply this class to components where you want to use the iOS26 design that is not automatically applied. Supported selectors are as follows:

- `ion-button.ios-liquid-glass`

### .ios-no-liquid-glass

Many components automatically have the iOS26 design applied, but apply this class when you don't want it. Supported selectors are as follows:

- `ion-header > ion-toolbar > ion-buttons > ion-button.ios-no-liquid-glass`
- `ion-popover.ios-no-liquid-glass`

### .outer-ion-list-inset

When you want to use `ion-list-inset` outside of `ion-content` with a `color` attribute, apply this class to the parent element.

- `.outer-ion-list-inset ion-list[inset=true]`
