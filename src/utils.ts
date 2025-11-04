import { AnimationPosition } from './sheets-of-glass/interfaces';

declare const __zone_symbol__requestAnimationFrame: any;
declare const requestAnimationFrame: any;

export const getElementRoot = (el: HTMLElement, fallback: HTMLElement = el) => {
  return el.shadowRoot || fallback;
};

export const raf = (h: FrameRequestCallback) => {
  if (typeof __zone_symbol__requestAnimationFrame === 'function') {
    return __zone_symbol__requestAnimationFrame(h);
  }
  if (typeof requestAnimationFrame === 'function') {
    return requestAnimationFrame(h);
  }
  return setTimeout(h);
};

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

export const getStep = (targetX: number, animationPosition: AnimationPosition) => {
  if (animationPosition === undefined) {
    return 0;
  }
  const currentX = targetX - animationPosition.width / 2;
  let progress = (currentX - animationPosition.minPositionX) / (animationPosition.maxPositionX - animationPosition.minPositionX);
  progress = Math.max(0, Math.min(1, progress)); // clamp 0〜1
  return progress;
};

export const changeSelectedElement = (
  targetElement: HTMLElement,
  selectedElement: HTMLElement,
  effectTagName: string,
  selectedClassName: string,
): void => {
  targetElement.querySelectorAll(effectTagName).forEach((element) => {
    element.classList.remove(selectedClassName);
    element.classList.remove('ion-activated');
  });
  selectedElement.classList.add('ion-activated');
};
