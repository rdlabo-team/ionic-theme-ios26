import { AnimationPosition } from './interfaces';

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
