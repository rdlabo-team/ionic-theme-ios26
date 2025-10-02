# Feature Requests for Ionic Framework
## feat(): native container add at ion-segment

現在、`ion-segment` はShadowDOMであるにもかかわらず、container DOMをもっていない。このため、 `ion-segment` にスタイルをあてるためには、`ion-segment` 自身にあてるしか方法がない。このため、子孫要素である `ion-segment-button` のタップエフェクトを、 `ion-segment` の外に表示することができない。

Current:

```html
<ion-segment>
  ::shadow-root
    // Put child element
    <ion-segment-button></ion-segment-button>
    <ion-segment-button></ion-segment-button>
</ion-segment>
```

After:

```html
<ion-segment>
  ::shadow-root
    <div class="segment-container" part="container">
      // Put child element
      <ion-segment-button></ion-segment-button>
      <ion-segment-button></ion-segment-button>
    </div>
</ion-segment>
```

このことで、以下のようにスタイリングしたい。

```scss
ion-segment {
  &::part(container) {
    overflow: visible;
    margin: 12px;     // Enable Effect Area
    background: var(255, 255, 255, 0.7);
  }
  ion-segment-button {
    &.segment-button-checked {
      transform: scale(1.1);   // Enable overflow effect
    }
  }
}
```
