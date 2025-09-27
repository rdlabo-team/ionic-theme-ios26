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

And import the theme in your project's main CSS file (e.g., `src/styles.scss`) and set the `--floating-safe-area-bottom` variable:

```scss
@import '@rdlabo/ionic-theme-ios26/css/ionic-theme-ios26.css';

/* Required: Safe area configuration */
:root {
  --floating-safe-area-bottom: calc(max(10px, var(--ion-safe-area-bottom, 0px)) + var(--admob-safe-area, 0px));
}
```

> **Important**: The theme will not work correctly without the `--floating-safe-area-bottom` setting. This configuration is mandatory.

## Important Notes

### Using `ion-item-group`

Under specific conditions, you need to use `ion-item-group`. For details, please refer to [USING_ION_ITEM_GROUP.md](./USING_ION_ITEM_GROUP.md).


## CSS Utility Classes

### .enable-back-button

In Ionic, pages navigated via push automatically have the `.can-go-back` class added to the Page Component to indicate that pop navigation is possible. However, even if `ion-back-button` is placed, when accessing the page directly, `.can-go-back` is not added. This class is an alternative for manually adding it.

- `.ion-page.enable-back-button`

```typescript
const routePage = pageComponent.querySelector('.ion-page:not(.ion-page-hidden)');
if (routePage.querySelector('ion-back-button')) {
  routePage.classList.add('enable-back-button');
}
```

### .liquid-glass

Apply this class to components where you want to use the iOS26 design that is not automatically applied. Supported selectors are as follows:

- `ion-button.liquid-glass`

### .exclude-liquid-glass

Many components automatically have the iOS26 design applied, but apply this class when you don't want it. Supported selectors are as follows:

- `ion-header > ion-toolbar > ion-buttons > ion-button.exclude-liquid-glass`
- `ion-popover.exclude-liquid-glass`

### .outer-ion-list-inset

When you want to use `ion-list-inset` outside of `ion-content` with a `color` attribute, apply this class to the parent element.

- `div.outer-ion-list-inset ion-list[inset=true]`
