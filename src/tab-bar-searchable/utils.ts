export const throwErrorByFailedToGet = (selector: string): Error => {
  return new Error('Function expect click Element is inner `' + selector + '`');
};

export const getElement = (docs: HTMLElement, selector: string): HTMLElement => {
  const el = docs.querySelector<HTMLElement>(selector);
  if (!el) {
    throw throwErrorByFailedToGet(selector);
  }
  return el;
};
