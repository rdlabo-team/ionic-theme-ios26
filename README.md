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

## API
### CSS Variables
To customize the library's default styles to match your design, we provide several CSS variables. For details, please refer to this file:

https://github.com/rdlabo-team/ionic-theme-ios26/blob/main/src/default-variables.scss

### `.ios26-disabled` Class

**Recommended for**: When you want to apply the iOS26 theme to all components in general, but use standard Ionic styling in specific places.

After importing all components, you can disable the iOS26 theme for specific component instances by adding the `.ios26-disabled` class.

```html
<!-- iOS26 theme applied -->
<ion-button>iOS26 Design</ion-button>

<!-- Standard Ionic iOS styling -->
<ion-button class="ios26-disabled">Standard Ionic Design</ion-button>
```


## Important Notes

### `ion-back-button` must not be animated

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

### Even Better With Brightness Colors

In iOS26, the Submit button uses text and border colors that are slightly brighter than the base color. Because this effect cannot be created by simply transforming existing palette colors, you need to provide separate colors. You don’t have to define them—the design will still work—but consider adding them if you want more refined color results.

```diff
  :root {
+   --ion-color-primary-brightness-rgb: 130, 255, 255;
+   --ion-color-secondary-brightness-rgb: [your brightness color];
+   --ion-color-tertiary-brightness-rgb: [your brightness color];
+   --ion-color-success-brightness-rgb: [your brightness color];
+   --ion-color-warning-brightness-rgb: [your brightness color];
+   --ion-color-danger-brightness-rgb: [your brightness color];
+   --ion-color-light-brightness-rgb: [your brightness color];
+   --ion-color-medium-brightness-rgb: [your brightness color];
+   --ion-color-dark-brightness-rgb: [your brightness color];
  }
```

### You can also use the liquid glass mixin

You can use the liquid glass mixin by importing SCSS files from the main package.

```scss
@use '@rdlabo/ionic-theme-ios26/src/utils/api';

ion-textarea label.textarea-wrapper {
  @include api.glass-background;
}
```

## Migration Support: Selective Theme Application

You may want to apply the iOS26 theme to your Ionic project but find it difficult to apply it to all components. We provide two approaches to selectively control theme application.

While `@import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26.css'` applies styling to all components at once, you can also import them individually.

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/utils/translucent';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-action-sheet';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-alert';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-breadcrumbs';
@import '@rdlabo/ionic-theme-ios26/dist/css/components/ion-button';
...
```

### Individual Import for Dark Mode Components

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
@include theme-dark.ion-tabs;
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
    @include theme-dark.ion-tabs;
}
```

Class (Toggle with CSS Class):
```scss
@use '@rdlabo/ionic-theme-ios26/src/utils/theme-dark';

.ion-palette-dark {
    @include theme-dark.default-variables;
    @include theme-dark.ion-button;
    @include theme-dark.ion-fab;
    @include theme-dark.ion-tabs;
}
```

