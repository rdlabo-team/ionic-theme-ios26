import { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { AnimationPosition, EffectScales } from './interfaces';
import { createAnimation, GestureDetail } from '@ionic/core';
import { getStep } from './utils';

export const getScaleAnimation = (effectElement: Element, scales: EffectScales, scaleAnimation: Animation | undefined): Animation => {
  if (scaleAnimation === undefined) {
    scaleAnimation = createAnimation()
      .addElement(effectElement.shadowRoot!.querySelector<HTMLElement>('[part="native"]')!)
      .duration(200)
      .easing('ease-out')
      .to('transform', `${scales.medium}`);
  }
  return scaleAnimation;
};

export const createMoveAnimation = (
  effectElement: Element,
  detail: GestureDetail,
  tabSelectedElement: Element,
  animationPosition: AnimationPosition,
): Animation => {
  return createAnimation()
    .duration(500)
    .addElement(effectElement)
    .beforeStyles({
      width: `${tabSelectedElement.clientWidth}px`,
      height: `${tabSelectedElement.clientHeight}px`,
      display: 'block',
      opacity: '1',
    })
    .fromTo(
      'transform',
      `translate3d(${animationPosition.minPositionX}px, ${animationPosition.positionY}px, 0)`,
      `translate3d(${animationPosition.maxPositionX}px, ${animationPosition.positionY}px, 0)`,
    )
    .progressStep(getStep(detail.currentX, animationPosition));
};
