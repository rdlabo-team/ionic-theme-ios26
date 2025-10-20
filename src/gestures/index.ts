import { AnimationPosition, EffectScales, registeredEffect } from './interfaces';
import { createGesture, GestureDetail } from '@ionic/core';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { Gesture } from '@ionic/core/dist/types/utils/gesture';
import { cloneElement, getStep } from './utils';
import { createMoveAnimation, getScaleAnimation } from './animations';

const GESTURE_NAME = 'ios26-enable-gesture';
const ANIMATED_NAME = 'ios26-animated';

export const registerEffect = (
  targetElement: HTMLElement,
  effectTagName: string,
  selectedClassName: string,
  scales: EffectScales,
): registeredEffect | undefined => {
  if (!targetElement.classList.contains('ios')) {
    return undefined;
  }

  let gesture!: Gesture;
  let moveAnimation: Animation | undefined;
  let scaleAnimation: Animation | undefined;
  let currentTouchedElement: HTMLElement | undefined;
  let clearActivatedTimer: ReturnType<typeof setTimeout> | undefined;
  let animationPosition: AnimationPosition | undefined = undefined;
  const effectElement = cloneElement(effectTagName);

  /**
   * These event listeners fix a bug where gestures don't complete properly.
   * They terminate the gesture using native events as a fallback.
   */
  const onPointerDown = () => {
    clearActivated();
    gesture.destroy();
    createAnimationGesture();
  };
  const onPointerUp = (event: PointerEvent) => {
    clearActivatedTimer = setTimeout(() => {
      onEndGesture();
      gesture.destroy();
      createAnimationGesture();
    });
  };

  targetElement.addEventListener('pointerdown', onPointerDown);
  targetElement.addEventListener('pointerup', onPointerUp);

  const createAnimationGesture = () => {
    targetElement.classList.add(GESTURE_NAME);
    gesture = createGesture({
      el: targetElement,
      threshold: 0,
      gestureName: `${GESTURE_NAME}_${effectTagName}_${crypto.randomUUID()}`,
      onStart: (event) => onStartGesture(event),
      onMove: (event) => onMoveGesture(event),
      onEnd: () => {
        onEndGesture().then();
      },
    });
    gesture.enable(true);
  };
  createAnimationGesture();

  const clearActivated = () => {
    if (!currentTouchedElement) {
      return;
    }
    currentTouchedElement!.click();
    currentTouchedElement?.classList.remove('ion-activated');
    currentTouchedElement = undefined;
    effectElement.style.display = 'none';
    effectElement.innerHTML = '';
    effectElement.style.transform = 'none';
    targetElement.classList.remove(ANIMATED_NAME);
  };

  const onStartGesture = (detail: GestureDetail): boolean | undefined => {
    currentTouchedElement = ((detail.event.target as HTMLElement).closest(effectTagName) as HTMLElement) || undefined;
    const tabSelectedElement = targetElement.querySelector(`${effectTagName}.${selectedClassName}`);
    if (currentTouchedElement === undefined || tabSelectedElement === null) {
      return false;
    }
    animationPosition = {
      minPositionX: targetElement.getBoundingClientRect().left,
      maxPositionX: targetElement.getBoundingClientRect().right - tabSelectedElement.clientWidth,
      width: tabSelectedElement.clientWidth,
      positionY: tabSelectedElement.getBoundingClientRect().top,
    };
    targetElement.classList.add(ANIMATED_NAME);
    currentTouchedElement!.classList.add('ion-activated');
    moveAnimation = createMoveAnimation(effectElement, detail, tabSelectedElement, animationPosition);
    moveAnimation.progressStart();
    moveAnimation.progressStep(getStep(detail.currentX, animationPosition!));
    getScaleAnimation(effectElement, scales, scaleAnimation).play();
    return true;
  };

  const onMoveGesture = (detail: GestureDetail): boolean | undefined => {
    if (currentTouchedElement === undefined || !moveAnimation) {
      return false; // Skip Animation
    }
    // console.log(detail.velocityX);
    const latestTouchedElement = ((detail.event.target as HTMLElement).closest(effectTagName) as HTMLElement) || undefined;
    if (latestTouchedElement && currentTouchedElement !== latestTouchedElement) {
      currentTouchedElement.classList.remove('ion-activated');
      currentTouchedElement.classList.remove(selectedClassName);
      currentTouchedElement = latestTouchedElement;
      currentTouchedElement.classList.add('ion-activated');
      currentTouchedElement.classList.add(selectedClassName);
    }
    moveAnimation.progressStep(getStep(detail.currentX, animationPosition!));
    return true;
  };

  const onEndGesture = async (): Promise<boolean | undefined> => {
    await getScaleAnimation(effectElement, scales, scaleAnimation).duration(100).to('transform', `scale(1)`).play();

    // タイマーをクリア（正常にonEndGestureが実行された場合）
    if (clearActivatedTimer !== undefined) {
      clearTimeout(clearActivatedTimer);
      clearActivatedTimer = undefined;
    }

    if (currentTouchedElement === undefined || !moveAnimation) {
      return false;
    }

    const targetX = currentTouchedElement.getBoundingClientRect().left - currentTouchedElement.clientWidth / 2;
    const step = getStep(targetX, animationPosition!);
    moveAnimation.progressStep(step);
    moveAnimation.destroy();
    clearActivated();
    getScaleAnimation(effectElement, scales, scaleAnimation).pause();
    return true;
  };

  return {
    destroy: () => {
      // Remove event listeners
      targetElement.removeEventListener('pointerdown', onPointerDown);
      targetElement.removeEventListener('pointerup', onPointerUp);

      // Clear any pending timer
      if (clearActivatedTimer !== undefined) {
        clearTimeout(clearActivatedTimer);
        clearActivatedTimer = undefined;
      }

      // Clear activated state
      clearActivated();

      // Destroy gesture
      if (gesture) {
        gesture.destroy();
      }
      // Remove gesture class
      targetElement.classList.remove(GESTURE_NAME);
    },
  };
};
