# Breaking Changes
This is a comprehensive list of the breaking changes introduced in the major version releases of `@rdlabo/ionic-theme-ios26`

## Version 2.0.0

### `iosTransitionAnimation` is now required

To support smooth and consistent transitions, setting `iosTransitionAnimation` is now mandatory.  
This animation is based on Ionic’s default iOS transition, but with the `animateBackButton()` logic removed — a behavior that is no longer used in the iOS 26 design.

You can configure it in your Ionic setup:

```ts
import { isPlatform } from '@ionic/core'; // or @ionic/angular/standalone, @ionic/react, @ionic/vue
import { iosTransitionAnimation } from '@rdlabo/ionic-theme-ios26';

// Angular
provideIonicAngular({
    ...
    navAnimation: isPlatform('ios') ? iosTransitionAnimation: undefined,
});

// React
setupIonicReact({
    ...
    navAnimation: isPlatform('ios') ? iosTransitionAnimation: undefined,
});

// Vue
createApp(App)
    .use(IonicVue, {
        ...
        navAnimation: isPlatform('ios') ? iosTransitionAnimation: undefined,
})
```

With this update, the previously discouraged pattern `<ion-buttons><ion-back-button></ion-back-button></ion-buttons>`can now be used again without causing transition issues.

### Why does `iosTransitionAnimation` need to be replaced?

In iOS 18, the system used a transition where the Large Title text animated into the back-button label when navigating forward.  
Ionic replicated this system animation using `animateBackButton()`, which worked by duplicating DOM nodes to create the effect.

However, this Large Title–to–back-button animation was removed in iOS 26.  
Because the behavior no longer exists on modern iOS, Ionic’s built-in transition still contained unnecessary logic that caused unwanted side effects with custom headers.

To align with the new iOS 26 design, our `iosTransitionAnimation` removes the now-obsolete `animateBackButton()` step.  
As a result, transitions are smoother and header structures such as custom `<ion-buttons>` with `<ion-back-button>` work reliably again.


## Version 1.0.0

### change the import path of the SCSS files

Reorganized the folder structure after adding JavaScript files.

```diff
- @import '@rdlabo/ionic-theme-ios26/src/default-variables.scss';
+ @import '@rdlabo/ionic-theme-ios26/src/styles/default-variables.scss';
```

Note: The output path for the generated dist files remains unchanged.

### `--ios26-color-background-rgb` is renamed.
Changed the variable names for clarity.

```diff
  :root {
-   --ios26-color-background-rgb: 255, 255, 255;
+   --ios26-content-box-shadow-rgb: 255, 255, 255;
  }
```

### `--ion-color-**-brightness-rgb` is changed to `--ion-color-**-brightness`
Refactoring the styling removed the need to manipulate transparency.
```diff
  :root {
-   --ion-color-**-brightness-rgb: 130, 255, 255;
+   --ion-color-**-brightness: #96FEFF;
  }
```
