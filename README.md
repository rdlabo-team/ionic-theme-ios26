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

And import the theme in your project's main CSS file (e.g., `src/styles.scss`).

```css
@import '@rdlabo/ionic-theme-ios26/dist/css/default-variables.css';
@import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-ios26.min.css';

/*
 * Support Dark Mode
 * We support Ionic Dark Mode. More information is here: https://ionicframework.com/docs/theming/dark-mode
 * use Always:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-dark-always.min.css'
 * use System:    @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-dark-system.min.css'
 * use CSS Class: @import '@rdlabo/ionic-theme-ios26/dist/css/ionic-theme-dark-class.min.css'
 */
```

## Important Notes

### `ion-back-button` は `ion-buttons` に入れないで使う必要があります

以下の条件を満たす時、Ionic Frameworkは `ion-back-button` をプログラムで生成して、アニメーションで表示します。

- 遷移前のページに `ion-header[collapse='condense']` を使用している
- 遷移後のページに、 `ion-buttons ion-back-button` がある

これはiOS26のUIではなく、このプログラムを避けるために以下の実装を行う必要があります。

```diff
  <ion-header>
-   <ion-buttons slot="start">
-   <ion-back-button></ion-back-button>
-   </ion-buttons>
+   <ion-back-button slot=start></ion-back-button>
  </ion-header>
```

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

## CSS Utility Classes

### .ios26-no-liquid-glass

Many components automatically have the iOS26 design applied, but apply this class when you don't want it. Supported selectors are as follows:

- `ion-header > ion-toolbar > ion-buttons.ios26-no-liquid-glass`
- `ion-header > ion-toolbar > ion-buttons > ion-button.ios26-no-liquid-glass`
- `ion-header > ion-toolbar > ion-buttons > ion-back-button.ios26-no-liquid-glass`
- `ion-header > ion-toolbar > ion-back-button.ios26-no-liquid-glass`
- `ion-popover.ios26-no-liquid-glass`
