# FeedBack

### Note
- ion-segment-buttonのscaleを大きくした時、効果をion-segmentの外にまで表示する

## feat(): ion-config new property for `collapse`

`collapse` の挙動は現在、ios modeで自動的に有効になりますが、これを `ion-config` でハンドリングできるようにすべきです。

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

遷移前画面で `collapse` を使っており、遷移後画面で `ion-buttons ion-back-button` を指定している場合、iOS18以前のアニメーション処理が行われます。これは、iOS26以降では不要なので、無効化できるプロパティが必要です。

https://github.com/ionic-team/ionic-framework/blob/3b80473f2fd5ad4da5a9f5d66f783a69909c8965/core/src/utils/transition/ios.transition.ts#L333C31-L337
- enteringBackButtonTextAnimation
- enteringBackButtonIconAnimation 
- enteringBackButtonAnimation

現在、 `ion-buttons > ion-back-button` をセレクタする関係上、 `ion-back-button` を `ion-buttons` の中にいれない対応をとっています。


## feat(): ion-content[fullscreen=true] will have .content-fullscreen class

iOS26の上下セーフエリアのぼかしを入れるため、ion-contentがfullscreen設定されているかのclassが必要です。
以下のようなセレクターの指定を行いたいです。

```css
.ion-page:has(ion-header.header-translucent) ion-content.content-fullscreen {
}

.ion-page:has(ion-header.footer-translucent) ion-content.content-fullscreen {
}
```

現在、 `translucent` な要素を使っている場合はfullscreenを指定している前提で実装していますが、これは確実ではありません。


## feat(): add .range-knob-min and .range-knob-max directly to ion-range

現在、`.range-knob-min` と `.range-knob-max` はShadowDOMの中のDOMにつくが、これは `ion-range` 自身の状態を意味するため、直接つけてほしい。
このことで、knobのスタイルに自由度が生まれる。 

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

### native part to ion-toast
`ion-toast` のデフォルトスタイルは `div.toast-wrapper` に適用されており、 CSS Custom Propertiesのオーバーライドも同様である。しかし、`div.toast-wrapper` を直接上書きする手段はなく、現在、このスタイルを CSS Custom Properties を使って無効化した上で `::part(container)` に新しいスタイルを当てている。これはスタイリングとしては適切ではないので、`::part(native)` を追加して、 `div.toast-wrapper` を直接上書きできることが望ましい。

```diff
  <ion-toast>
-   <div class="toast-wrapper">...</div>
+   <div class="toast-wrapper" part="native">...</div>
  </ion-toast>
```


