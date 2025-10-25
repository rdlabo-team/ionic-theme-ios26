import { createAnimation } from '@ionic/core';
import { getElementRoot } from '../../utils';

import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';

/**
 * iOS Popover Leave Animation
 */
export const iosLeaveAnimation = (baseEl: HTMLElement): Animation => {
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector('.popover-content') as HTMLElement;
  const arrowEl = root.querySelector('.popover-arrow') as HTMLElement | null;

  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const contentAnimation = createAnimation();
  const targetAnimation = createAnimation();

  const doc = baseEl.ownerDocument as any;
  const replaceElement = doc.querySelector('.ios26-replace-element') as HTMLElement | null;

  if (replaceElement) {
    targetAnimation
      .addElement(replaceElement)
      .delay(100)
      .duration(200)
      .afterRemoveClass('ios26-replace-element')
      .fromTo('transform', 'scale(1.05)', 'scale(1)')
      .fromTo('opacity', 0.1, 1);
  }

  backdropAnimation.addElement(root.querySelector('ion-backdrop')!).fromTo('opacity', 'var(--backdrop-opacity)', 0);

  contentAnimation
    .duration(400)
    .easing('ease')
    .addElement(root.querySelector('.popover-arrow')!)
    .addElement(root.querySelector('.popover-content')!)
    .fromTo('opacity', 0.99, 0);

  const popoverContentDataset = root.querySelector<HTMLElement>('.popover-content')!.dataset['transformOrigin'];
  if (popoverContentDataset) {
    contentAnimation
      .beforeStyles({ 'transform-origin': popoverContentDataset })
      .afterAddRead(() => {
        root.querySelector<HTMLElement>('.popover-content')!.dataset['transformOrigin'] = '';
      })
      .fromTo('transform', 'scale(1)', 'scale(0.1)');
  }

  return baseAnimation
    .easing('ease')
    .afterAddWrite(() => {
      baseEl.style.removeProperty('--width');
      baseEl.classList.remove('popover-bottom');

      contentEl.style.removeProperty('top');
      contentEl.style.removeProperty('left');
      contentEl.style.removeProperty('bottom');
      contentEl.style.removeProperty('transform-origin');

      if (arrowEl) {
        arrowEl.style.removeProperty('top');
        arrowEl.style.removeProperty('left');
        arrowEl.style.removeProperty('display');
      }
    })
    .duration(400)
    .addAnimation([backdropAnimation, contentAnimation, targetAnimation]);
};
