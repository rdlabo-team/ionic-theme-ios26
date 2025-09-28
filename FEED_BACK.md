## feat(): ion-config new property for disable ion-back-button Animation

遷移前画面で `collapse` を使っており、遷移後画面で `ion-buttons ion-back-button` を指定している場合、iOS18以前のアニメーション処理が行われます。これは、iOS26以降では不要なので、無効化できるプロパティが必要です。

https://github.com/ionic-team/ionic-framework/blob/3b80473f2fd5ad4da5a9f5d66f783a69909c8965/core/src/utils/transition/ios.transition.ts#L333C31-L337
- enteringBackButtonTextAnimation
- enteringBackButtonIconAnimation 
- enteringBackButtonAnimation

現在、 `ion-buttons > ion-back-button` をセレクタする関係上、 `ion-back-button` を `ion-buttons` の中にいれない対応をとっています。。

# feat(): ion-content[fullscreen=true] will have .content-fullscreen class

iOS26の上下セーフエリアのぼかしを入れるため、ion-contentがfullscreen設定されているかのclassが必要です。
以下のようなセレクターの指定を行いたいです。

```css
.ion-page:has(ion-header.header-translucent) ion-content.content-fullscreen {
}

.ion-page:has(ion-header.footer-translucent) ion-content.content-fullscreen {
}
```

現在、 `translucent` な要素を使っている場合はfullscreenを指定している前提で実装していますが、これは確実ではありません。
