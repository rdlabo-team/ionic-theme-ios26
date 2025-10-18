import { EffectScales, registeredEffect } from './interfaces';
import { createGesture, GestureDetail, createAnimation } from '@ionic/core';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { Gesture } from '@ionic/core/dist/types/utils/gesture';
import { cloneElement, getTransform } from './utils';

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
  let currentTouchedElement: HTMLElement | undefined;
  let animationLatestX: number | undefined;
  let scaleElement: HTMLElement | undefined;
  let effectPositionY: number | undefined;

  let enterAnimationPromise: Promise<void> | undefined;
  let moveAnimationPromise: Promise<void> | undefined;
  let clearActivatedTimer: ReturnType<typeof setTimeout> | undefined;
  const effectElement = cloneElement(effectTagName);

  /**
   * Wait to render.
   */
  requestAnimationFrame(() => (scaleElement = effectElement.shadowRoot!.querySelector<HTMLElement>('[part="native"]') || undefined));

  /**
   * These event listeners fix a bug where gestures don't complete properly.
   * They terminate the gesture using native events as a fallback.
   */
  const onPointerDown = () => {
    clearActivated();
    currentTouchedElement?.classList.remove('ion-activated');
    gesture.destroy();
    createAnimationGesture();
  };
  const onPointerUp = (event: PointerEvent) => {
    clearActivatedTimer = setTimeout(() => {
      onEndGesture();
      currentTouchedElement?.classList.remove('ion-activated');
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
      onEnd: () => onEndGesture(),
    });
    gesture.enable(true);
  };
  createAnimationGesture();

  const animation = createAnimation()
    .onFinish(() => {
      currentTouchedElement!.classList.remove('ion-activated');
      clearActivated();
    })
    .duration(500);

  const clearActivated = () => {
    if (!currentTouchedElement) {
      return;
    }
    currentTouchedElement!.click();
    currentTouchedElement = undefined;
    effectElement.style.display = 'none';
    effectElement.innerHTML = '';
    effectElement.style.transform = 'none';
    effectElement.style.opacity = '0';
    effectElement.style.background = 'red';
    targetElement.classList.remove(ANIMATED_NAME);
    moveAnimation = undefined; // 次回のために破棄
    moveAnimationPromise = undefined;
    enterAnimationPromise = undefined; // 次回のためにリセット
  };

  let animationRange: [number, number, number] | undefined = undefined;

  const onStartGesture = (detail: GestureDetail): boolean | undefined => {
    currentTouchedElement = ((detail.event.target as HTMLElement).closest(effectTagName) as HTMLElement) || undefined;
    const tabSelectedElement = targetElement.querySelector(`${effectTagName}.${selectedClassName}`);
    if (currentTouchedElement === undefined || tabSelectedElement === null) {
      return false;
    }
    effectPositionY = tabSelectedElement.getBoundingClientRect().top;
    animationRange = [
      targetElement.getBoundingClientRect().left,
      targetElement.getBoundingClientRect().right - tabSelectedElement.clientWidth,
      tabSelectedElement.clientWidth,
    ];
    animation
      .addElement(effectElement)
      .beforeStyles({
        width: `${tabSelectedElement.clientWidth}px`,
        height: `${tabSelectedElement.clientHeight}px`,
        display: 'block',
        opacity: '1',
      })
      .fromTo(
        'transform',
        `translate3d(${animationRange[0]}px, ${effectPositionY}px, 0)`,
        `translate3d(${animationRange[1]}px, ${effectPositionY}px, 0)`,
      )
      .progressStep(getStep(detail.currentX));
    animation.progressStart();
    return true;
  };

  const getStep = (targetX: number) => {
    if (animationRange === undefined) {
      return 0;
    }
    const currentX = targetX - animationRange[2] / 2;
    let progress = (currentX - animationRange[0]) / (animationRange[1] - animationRange[0]);
    progress = Math.max(0, Math.min(1, progress)); // clamp 0〜1
    return progress;
  };

  const onMoveGesture = (detail: GestureDetail): boolean | undefined => {
    if (currentTouchedElement === undefined || enterAnimationPromise || moveAnimationPromise) {
      return true; // Skip Animation
    }
    const latestTouchedElement = ((detail.event.target as HTMLElement).closest(effectTagName) as HTMLElement) || undefined;
    if (latestTouchedElement && currentTouchedElement !== latestTouchedElement) {
      currentTouchedElement.classList.remove('ion-activated');
      currentTouchedElement.classList.remove(selectedClassName);
      currentTouchedElement = latestTouchedElement;
      currentTouchedElement.classList.add('ion-activated');
      currentTouchedElement.classList.add(selectedClassName);
    }
    const step = getStep(detail.currentX);
    animation.progressStep(step);
    return true;
  };

  const onEndGesture = (): boolean | undefined => {
    // タイマーをクリア（正常にonEndGestureが実行された場合）
    if (clearActivatedTimer !== undefined) {
      clearTimeout(clearActivatedTimer);
      clearActivatedTimer = undefined;
    }

    if (currentTouchedElement === undefined) {
      return false;
    }

    const targetX = currentTouchedElement.getBoundingClientRect().left - currentTouchedElement.clientWidth / 2;
    const step = getStep(targetX);
    animation.progressStep(step);
    animation.progressEnd(1, 0);
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
