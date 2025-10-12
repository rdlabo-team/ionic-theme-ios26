export const cloneElement = (tagName: string): HTMLElement => {
  const getCachedEl = document.querySelector(`${tagName}.ion-cloned-element`);
  if (getCachedEl !== null) {
    return getCachedEl as HTMLElement;
  }

  const clonedEl = document.createElement(tagName) as HTMLElement;
  clonedEl.classList.add('ion-cloned-element');
  clonedEl.style.setProperty('display', 'none');
  document.body.appendChild(clonedEl);

  return clonedEl;
};

export const getTransform = (detailCurrentX: number, tabEffectElY: number, tabSelectedActual: Element): string => {
  const diff = -2;
  const currentX = detailCurrentX - tabSelectedActual.clientWidth / 2;
  const maxLeft = tabSelectedActual.getBoundingClientRect().left + diff;
  const maxRight = tabSelectedActual.getBoundingClientRect().right - diff - tabSelectedActual.clientWidth;

  if (maxLeft < currentX && currentX < maxRight) {
    return `translate3d(${currentX}px, ${tabEffectElY}px, 0)`;
  }
  if (maxLeft > currentX) {
    return `translate3d(${maxLeft}px, ${tabEffectElY}px, 0)`;
  }
  return `translate3d(${maxRight}px, ${tabEffectElY}px, 0)`;
};
