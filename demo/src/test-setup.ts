// Polyfills for jsdom missing DOM APIs used by Ionic components

// window.matchMedia is not implemented in jsdom
if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

// Element.scrollTo is not implemented in jsdom
if (typeof Element.prototype.scrollTo !== 'function') {
  Element.prototype.scrollTo = () => {};
}
