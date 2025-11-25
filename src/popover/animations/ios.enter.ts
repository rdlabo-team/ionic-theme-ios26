import { createAnimation } from '@ionic/core';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { getElementRoot } from '../../utils';
import { calculateWindowAdjustment, getPopoverDimensions, getPopoverPosition } from '../utils';

const POPOVER_IOS_BODY_PADDING = 5;
export const POPOVER_IOS_BODY_MARGIN = 8;

/**
 * iOS Popover Enter Animation
 */
// TODO(FW-2832): types
export const iosEnterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const { event: ev, size, trigger, reference, side, align } = opts;
  const doc = baseEl.ownerDocument as any;
  const isRTL = doc.dir === 'rtl';
  const bodyWidth = doc.defaultView.innerWidth;
  const bodyHeight = doc.defaultView.innerHeight;

  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector('.popover-content') as HTMLElement;

  const referenceSizeEl = trigger || ev?.detail?.ionShadowTarget || ev?.target;
  const { contentWidth, contentHeight } = getPopoverDimensions(size, contentEl, referenceSizeEl);

  const isReplace = ((): boolean => {
    if (!['ion-button', 'ion-buttons'].includes(referenceSizeEl.localName)) {
      return false;
    }
    if (referenceSizeEl.classList.contains('ios26-disabled')) {
      return false;
    }
    return true;
  })();

  const defaultPosition = {
    top: bodyHeight / 2 - contentHeight / 2,
    left: bodyWidth / 2 - contentWidth / 2,
    originX: isRTL ? 'right' : 'left',
    originY: 'top',
  };

  const results = getPopoverPosition(isRTL, contentWidth, contentHeight, reference, side, align, defaultPosition, trigger, ev);

  const padding = size === 'cover' ? 0 : POPOVER_IOS_BODY_PADDING;
  const margin = size === 'cover' ? 0 : POPOVER_IOS_BODY_MARGIN;

  const { originX, originY, top, left, bottom, checkSafeAreaLeft, checkSafeAreaRight, addPopoverBottomClass } = calculateWindowAdjustment(
    side,
    results.top,
    results.left,
    padding,
    bodyWidth,
    bodyHeight,
    contentWidth,
    contentHeight,
    margin,
    results.originX,
    results.originY,
    results.referenceCoordinates,
    referenceSizeEl.getBoundingClientRect(),
    isReplace,
  );

  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const contentAnimation = createAnimation();
  const targetAnimation = createAnimation();

  backdropAnimation
    .delay(100)
    .duration(300)
    .addElement(root.querySelector('ion-backdrop')!)
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
      'pointer-events': 'none',
    })
    .afterClearStyles(['pointer-events']);

  // In Chromium, if the wrapper animates, the backdrop filter doesn't work.
  // The Chromium team stated that this behavior is expected and not a bug. The element animating opacity creates a backdrop root for the backdrop-filter.
  // To get around this, instead of animating the wrapper, animate content.
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1148826
  contentAnimation
    .easing('cubic-bezier(0, 1, 0.22, 1)')
    .delay(100)
    .duration(400)
    .addElement(root.querySelector('.popover-content')!)
    .beforeStyles({ 'transform-origin': `${originY} ${originX}` })
    .beforeAddWrite(() => {
      /**
       * 'transformOrigin' use for leave animation.
       */
      root.querySelector<HTMLElement>('.popover-content')!.dataset['transformOrigin'] = `${originY} ${originX}`;
    })
    .fromTo('transform', 'scale(0)', 'scale(1)')
    .fromTo('opacity', 0.01, 1);

  if (isReplace) {
    targetAnimation
      .delay(0)
      .duration(200)
      .addElement(referenceSizeEl)
      .beforeStyles({ 'transform-origin': `${originY} ${originX}` })
      .beforeAddClass('ios26-replace-element')
      .fromTo('transform', 'scale(1)', 'scale(1.05)')
      .fromTo('opacity', 1, 0);
  }

  return baseAnimation
    .easing('ease')
    .delay(100)
    .duration(100)
    .beforeAddWrite(() => {
      if (size === 'cover') {
        baseEl.style.setProperty('--width', `${contentWidth}px`);
      }

      if (addPopoverBottomClass) {
        baseEl.classList.add('popover-bottom');
      }

      if (bottom !== undefined) {
        contentEl.style.setProperty('bottom', `${bottom}px`);
      }

      const safeAreaLeft = ' + var(--ion-safe-area-left, 0)';
      const safeAreaRight = ' - var(--ion-safe-area-right, 0)';

      let leftValue = `${left}px`;

      if (checkSafeAreaLeft) {
        leftValue = `${left}px${safeAreaLeft}`;
      }
      if (checkSafeAreaRight) {
        leftValue = `${left}px${safeAreaRight}`;
      }

      contentEl.style.setProperty('top', `calc(${top}px + var(--offset-y, 0))`);
      contentEl.style.setProperty('left', `calc(${leftValue} + var(--offset-x, 0))`);
      contentEl.style.setProperty('transform-origin', `${originY} ${originX}`);
    })
    .addAnimation([backdropAnimation, contentAnimation, targetAnimation]);
};
