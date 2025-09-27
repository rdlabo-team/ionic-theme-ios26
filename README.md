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

__For development purposes, this is written in Japanese. It will be translated into English when it becomes stable.__

### Using `ion-item-group`

Under specific conditions, you need to use `ion-item-group`. For details, please refer to [USING_ION_ITEM_GROUP.md](./USING_ION_ITEM_GROUP.md).


## CSS Utility Class
__For development purposes, this is written in Japanese. It will be translated into English when it becomes stable.__

### .enable-back-button

Ionicでは、Pushで遷移したページは、Popが可能だとフラグを立てるためにPage Componentに `.can-go-back` が自動的に付与されます。しかし、 `ion-back-button` を設置していても、ダイレクトにそのページにアクセスした場合は `.can-go-back` は付与されないため、代替で手動で付与するためのClassです。

- `.ion-page.enable-back-button`

```typescript
const routePage = pageComponent.querySelector('.ion-page:not(.ion-page-hidden)');
if (routePage.querySelector('ion-back-button')) {
  routePage.classList.add('enable-back-button');
}
```

### .liquid-glass

iOS26デザインが適用されないコンポーネントに適用したい場合は、Classを付与してください。サポートしてるセレクタは以下の通りです。

- `ion-button.liquid-glass`

### .exclude-liquid-glass

多くのコンポーネントに自動的にiOS26デザインが適用されますが、適用したくない場合にClassを付与してください。サポートしてるセレクタは以下の通りです。

- `ion-header > ion-toolbar > ion-buttons > ion-button.exclude-liquid-glass`
- `ion-popover.exclude-liquid-glass`

### .outer-ion-list-inset

`color` 属性をつけた `ion-content` 以外のところで、`ion-list-inset` を使いたい場合、親の要素につけてください。

- `div.outer-ion-list-inset ion-list[inset=true]`
