import { registeredEffect } from './sheets-of-glass/interfaces';
import { registerEffect } from './sheets-of-glass';
export * from './sheets-of-glass/interfaces';

export const registerTabBarEffect = (targetElement: HTMLElement): registeredEffect | undefined => {
  return registerEffect(targetElement, 'ion-tab-button', 'tab-selected', {
    small: 'scale(1.1, 1)',
    medium: 'scale(1.2)',
    large: 'scale(1.3)',
    xlarge: 'scale(1.15, 1.4)',
  });
};

export const registerSegmentEffect = (targetElement: HTMLElement): registeredEffect | undefined => {
  return registerEffect(targetElement, 'ion-segment-button', 'segment-button-checked', {
    small: 'scale(1.35)',
    medium: 'scale(1.45)',
    large: 'scale(1.55)',
    xlarge: 'scale(1.55, 1.65)',
  });
};
