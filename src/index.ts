import { registeredEffect } from './sheets-of-glass/interfaces';
import { registerEffect } from './sheets-of-glass';
export * from './sheets-of-glass/interfaces';
export { iosEnterAnimation as popoverEnterAnimation } from './popover/animations/ios.enter';
export { iosLeaveAnimation as popoverLeaveAnimation } from './popover/animations/ios.leave';
export * from './tab-bar-searchable';

export const registerTabBarEffect = (targetElement: HTMLElement): registeredEffect | undefined => {
  return registerEffect(targetElement, 'ion-tab-button', 'tab-selected', {
    small: 'scale(1.1, 1)',
    medium: 'scale(1.2)',
    large: 'scale(1.3)',
    xlarge: 'scale(1.15, 1.4)',
  });
};

export const registerSegmentEffect = (targetElement: HTMLElement): registeredEffect | undefined => {
  const scale = !targetElement.classList.contains('segment-expand')
    ? {
        small: 'scale(1.35)',
        medium: 'scale(1.45)',
        large: 'scale(1.55)',
        xlarge: 'scale(1.55, 1.65)',
      }
    : {
        small: 'scale(1.02, 1.35)',
        medium: 'scale(1.03, 1.45)',
        large: 'scale(1.04, 1.55)',
        xlarge: 'scale(1.05, 1.65)',
      };
  return registerEffect(targetElement, 'ion-segment-button', 'segment-button-checked', scale);
};
