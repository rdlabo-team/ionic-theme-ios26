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

export const getTransform = (
  detailCurrentX: number,
  effectPositionY: number,
  selectedElement: Element,
  targetElement: Element | undefined = undefined,
): string => {
  const diff = -2;
  const currentX = detailCurrentX - selectedElement.clientWidth / 2;
  const maxLeft = targetElement ? targetElement.getBoundingClientRect().left : selectedElement.getBoundingClientRect().left + diff;
  const maxRight = targetElement
    ? targetElement.getBoundingClientRect().right - selectedElement.clientWidth
    : selectedElement.getBoundingClientRect().right - diff - selectedElement.clientWidth;

  if (maxLeft < currentX && currentX < maxRight) {
    return `translate3d(${currentX}px, ${effectPositionY}px, 0)`;
  }
  if (maxLeft > currentX) {
    return `translate3d(${maxLeft}px, ${effectPositionY}px, 0)`;
  }
  return `translate3d(${maxRight}px, ${effectPositionY}px, 0)`;
};
