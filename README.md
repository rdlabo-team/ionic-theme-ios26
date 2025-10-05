# Ionic Theme iOS26

A CSS theme library that applies iOS26 design system to Ionic applications.

![](screenshots/ios26.png)

DEMO is here: https://ionic-theme-ios26.netlify.app/

## Overview

This library provides CSS files to apply the iOS26 design system used in real projects to Ionic applications. It customizes the appearance and behavior of Ionic components based on the latest iOS26 design guidelines.

> **🧪Pre-release**: This library is currently in a pre-release state. While it is ready for use, it is being tested in a few projects, and we are continuing to improve API stability and documentation before full-scale adoption.

## 💖 Support This Project

Enjoying this project? Your support helps keep it alive and growing!  
Sponsoring means you directly contribute to new features, improvements, and maintenance.

[Become a Sponsor →](https://github.com/sponsors/rdlabo)

## Setup

This is a CSS theme for extending your Ionic project. It does not work on its own, so please use it together with the Ionic Framework.

```bash
npm install @rdlabo/ionic-theme-ios26
```

And import the theme in your project's main CSS file (e.g., `src/styles.scss`).

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/default-variables.css';
@import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26.css';


/**
 * If you need to include an ion-segment style with an incomplete design, please import it.
 * demo url: https://ionic-theme-ios26.netlify.app/main/index/segment
 *
 * @import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-segment.css';
 */


/**
 * This file is to eliminate the impact of class name changes for iOS26.
 * For example, `ion-buttons ion-button[fill=default]` is not normally implemented, but may be required for iOS26.
 * This file is to eliminate such effects.
 */
@import '@rdlabo/ionic-theme-ios26/dist/css/md-remove-ios-class-effect.css';

/*
 * Support Dark Mode
 * We support Ionic Dark Mode. More information is here: https://ionicframework.com/docs/theming/dark-mode
 * use Always:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-dark-always.css'
 * use System:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-dark-system.css'
 * use CSS Class: @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-dark-class.css'
 */
```

## Important Notes

### `ion-back-button` must not be animated

When the following conditions are met, the Ionic Framework programmatically generates and animates the `ion-back-button`:

- The previous page uses `ion-header[collapse='condense']`
- The navigated page has `ion-buttons ion-back-button`

This is not the iOS26 UI behavior. To avoid this programmatic behavior, you have two options:

> Note: This issue has been reported to the Ionic team and is expected to be improved in future releases.

#### Option 1: Change HTML structure (Recommended)

When `ion-back-button` is not a child of `ion-buttons`, it is not subject to the default animation. You can modify the structure as follows:

```diff
  <ion-header>
-   <ion-buttons slot="start">
-   <ion-back-button></ion-back-button>
-   </ion-buttons>
+   <ion-back-button slot="start"></ion-back-button>
  </ion-header>
```

#### Option 2: Global CSS approach (Alternative)

Alternatively, if you can tolerate some visual inconsistencies, you can add the following CSS globally. This approach also prevents unwanted animations even with `ion-buttons > ion-back-button`.

```css
ion-back-button.ion-cloned-element {
  visibility: hidden;
}
```

This CSS rule hides the duplicated `ion-back-button` element that Ionic automatically generates. Ionic duplicates and animates the original button under specific conditions, but hiding this duplicated element prevents unwanted visual effects.

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

### You can also use the liquid glass mixin

You can use the liquid glass mixin by importing SCSS files from the main package.

```scss
@use '@rdlabo/ionic-theme-ios26/src/utils/api';

ion-textarea label.textarea-wrapper {
  @include api.glass-background;
}
```

## Selective Theme Application

You may want to apply the iOS26 theme to your Ionic project but find it difficult to apply it to all components. We provide two approaches to selectively control theme application.

You can use `1. Import Components Individually` or `2. Using the .ios26-disabled Class`

### 1. Import Components Individually

**Recommended for**: When you want to apply the iOS26 theme only to specific components, or when you want to minimize bundle size.

While `@import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26.css'` applies styling to all components at once, you can also import them individually.

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/utils/translucent';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-action-sheet';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-alert';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-breadcrumbs';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-button';
...
```

#### Individual Import for Dark Mode Components

If you're using dark mode, you need to use SCSS because the selectors differ between `Always`, `System`, and `Class` modes, which cannot be handled with CSS files alone.

> **Note**: Currently, only `ion-button` has separate dark mode styling applied.

Always (Always Dark Mode):
```scss
@use '@rdlabo/ionic-theme-ios26/src/utils/theme-dark';

:root {
    @include theme-dark.default-variables;
}
@include theme-dark.ion-button;
@include theme-dark.ion-fab;
```

System (Follow System Settings):
```scss
@use '@rdlabo/ionic-theme-ios26/src/utils/theme-dark';

@media (prefers-color-scheme: dark) {
    :root {
        @include theme-dark.default-variables;
    }
    @include theme-dark.ion-button;
    @include theme-dark.ion-fab;
}
```

Class (Toggle with CSS Class):
```scss
@use '@rdlabo/ionic-theme-ios26/src/utils/theme-dark';

.ion-palette-dark {
    @include theme-dark.default-variables;
    @include theme-dark.ion-button;
    @include theme-dark.ion-fab;
}
```


### 2. Using the `.ios26-disabled` Class

**Recommended for**: When you want to apply the iOS26 theme to all components in general, but use standard Ionic styling in specific places.

After importing all components, you can disable the iOS26 theme for specific component instances by adding the `.ios26-disabled` class.

```html
<!-- iOS26 theme applied -->
<ion-button>iOS26 Design</ion-button>

<!-- Standard Ionic iOS styling -->
<ion-button class="ios26-disabled">Standard Ionic Design</ion-button>
```
