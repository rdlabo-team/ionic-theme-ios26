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
    const ratio = contentEl.getBoundingClientRect().width / contentEl.getBoundingClientRect().height;
    const scale = ratio > 1 ? `${Math.min(1.2, 1.05 * ratio)}, 1.05` : `1.05, ${Math.min(1.2, 1.05 * ratio)}`;

    targetAnimation
      .addElement(replaceElement)
      .delay(100)
      .duration(300)
      .afterRemoveClass('ios26-replace-element')
      .fromTo('transform', `scale(${scale})`, 'scale(1)')
      .fromTo('opacity', 0, 0.9);
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
    contentAnimation.beforeStyles({ 'transform-origin': popoverContentDataset }).afterAddRead(() => {
      root.querySelector<HTMLElement>('.popover-content')!.dataset['transformOrigin'] = '';
    });

    if (replaceElement) {
      contentAnimation.fromTo('transform', 'scale(1)', 'scale(0.55)');
    } else {
      contentAnimation.fromTo('transform', 'scale(1)', 'scale(0)');
    }
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
    .duration(300)
    .addAnimation([backdropAnimation, contentAnimation, targetAnimation]);
};
