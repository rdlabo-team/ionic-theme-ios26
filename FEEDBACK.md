# Feature Requests for Ionic Framework

## docs(): Naming conventions for Ionic theme classes
Resolved.

## feat(): ion-config new property for `collapse`

Currently, `collapse` behavior is automatically enabled in iOS mode, but this should be configurable through `ion-config` for better control.

ex:
```typescript
export interface IonicConfig {
    ...,
    collapseLargeTitle: {
        ios: boolean;
        md: boolean;
        ionic: boolean;
    },
    collapseBackButtonAnimation: {
        ios: boolean;
        md: boolean;
        ionic: boolean;
    },
}
```

### should disable ion-back-button Animation

When using `collapse` on the previous screen and specifying `ion-buttons ion-back-button` on the next screen, iOS 18 and earlier animation processing occurs. Since this is unnecessary for iOS 26+, a property to disable this would be beneficial.

https://github.com/ionic-team/ionic-framework/blob/3b80473f2fd5ad4da5a9f5d66f783a69909c8965/core/src/utils/transition/ios.transition.ts#L333C31-L337
- enteringBackButtonTextAnimation
- enteringBackButtonIconAnimation 
- enteringBackButtonAnimation

Currently, I work around this by not placing `ion-back-button` inside `ion-buttons` due to the selector relationship `ion-buttons > ion-back-button`.


## feat(): ion-content[fullscreen=true] will have .content-fullscreen class

For implementing iOS 26's blurred safe area effects, a class indicating whether `ion-content` has fullscreen configuration is needed.
I would like to use selectors like the following:

```css
.ion-page:has(ion-header.header-translucent) ion-content.content-fullscreen {
}

.ion-page:has(ion-header.footer-translucent) ion-content.content-fullscreen {
}
```

Currently, I assume fullscreen is specified when using `translucent` elements, but this is not guaranteed.


## feat(): add .range-knob-min and .range-knob-max directly to ion-range

Currently, `.range-knob-min` and `.range-knob-max` are applied to DOM elements inside ShadowDOM, but since these represent the state of `ion-range` itself, they should be applied directly to the component.
This would provide more flexibility for knob styling.

Current:
```html
<ion-range>
  #shadow-root
  ...
  <div class="range-knob-handle ... range-knob-min">...</div>
</ion-range>
```

After:
```html
<ion-range class="range-knob-min">
  #shadow-root
  ...
  <div class="range-knob-handle ... range-knob-min">...</div>
</ion-range>
```


## feat(): add native shadow-part for design

### native-inner(or item-inner) part to ion-item
The styling for `ion-item[lines=inset]` is applied to `.item-inner`, which cannot be styled directly. This limitation means that for iOS 26 styling, I can only modify the border-bottom style through `::part(native)` with padding-right, preventing me from utilizing the full right side of `ion-item`. Adding `::part(native-inner)` would increase styling flexibility.

```diff
  <ion-item>
    <button type="button" class="item-native" part="native">
-     <div class="item-inner">
+     <div class="item-inner" part="native-inner">
      ...
      </div>
    </button>
  </ion-item>
```

### native part to ion-toast
The default styling for `ion-toast` is applied to `div.toast-wrapper`, and CSS Custom Properties overrides work similarly. However, there's no way to directly override `div.toast-wrapper`. Currently, I disable this styling using CSS Custom Properties and then apply new styles to `::part(container)`. This is not ideal for styling, so adding `::part(native)` to allow direct override of `div.toast-wrapper` would be preferable.

```diff
  <ion-toast>
-   <div class="toast-wrapper">...</div>
+   <div class="toast-wrapper" part="native">...</div>
  </ion-toast>
```


