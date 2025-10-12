import { createGesture, GestureDetail, createAnimation } from '@ionic/core';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { Gesture } from '@ionic/core/dist/types/utils/gesture';
import { cloneElement, getTransform } from './utils';

const GestureName = 'enable-ios26-gesture';

interface EffectScales {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
}

export interface registeredEffect {
  destroy: () => void;
}

export const registerTabBarEffect = (targetElement: HTMLElement): registeredEffect | undefined => {
  return registerEffect(targetElement, 'ion-tab-button', 'tab-selected', {
    small: 'scale(1.1)',
    medium: 'scale(1.2)',
    large: 'scale(1.3)',
    xlarge: 'scale(1.3, 1.5)',
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

const registerEffect = (
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
  let effectElementPositionY: number | undefined;

  let enterAnimationPromise: Promise<void> | undefined;
  let moveAnimationPromise: Promise<void> | undefined;
  let clearActivatedTimer: ReturnType<typeof setTimeout> | undefined;

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
      onEndGesture(event.timeStamp || Date.now());
      gesture.destroy();
      createAnimationGesture();
    });
  };

  targetElement.addEventListener('pointerdown', onPointerDown);
  targetElement.addEventListener('pointerup', onPointerUp);

  const createAnimationGesture = () => {
    targetElement.classList.add(GestureName);
    gesture = createGesture({
      el: targetElement,
      threshold: 0,
      gestureName: `${GestureName}_${effectTagName}_${crypto.randomUUID()}`,
      onStart: (event) => onStartGesture(event),
      onMove: (event) => onMoveGesture(event),
      onEnd: (event) => onEndGesture(event.currentTime),
    });
    gesture.enable(true);
  };
  createAnimationGesture();

  const clearActivated = () => {
    if (!currentTouchedElement) {
      return;
    }
    requestAnimationFrame(() => {
      effectElement.style.display = 'none';
      effectElement.innerHTML = '';
      effectElement.style.transform = 'none';
    });

    currentTouchedElement!.classList.remove('ion-activated');

    currentTouchedElement = undefined;
    moveAnimation = undefined; // 次回のために破棄
    moveAnimationPromise = undefined;
    enterAnimationPromise = undefined; // 次回のためにリセット
  };

  const onStartGesture = (detail: GestureDetail): boolean | undefined => {
    enterAnimationPromise = undefined;
    currentTouchedElement = ((detail.event.target as HTMLElement).closest(effectTagName) as HTMLElement) || undefined;
    const tabSelectedElement = targetElement.querySelector(`${effectTagName}.${selectedClassName}`);
    if (currentTouchedElement === undefined || tabSelectedElement === null) {
      return false;
    }
    effectElementPositionY = tabSelectedElement.getBoundingClientRect().top;

    const startTransform = getTransform(
      tabSelectedElement.getBoundingClientRect().left + tabSelectedElement.clientWidth / 2,
      effectElementPositionY,
      tabSelectedElement,
    );
    const middleTransform = getTransform(
      (tabSelectedElement.getBoundingClientRect().left + tabSelectedElement.clientWidth / 2 + detail.currentX) / 2,
      effectElementPositionY,
      currentTouchedElement,
    );
    const endTransform = getTransform(detail.currentX, effectElementPositionY, currentTouchedElement);
    const enterAnimation = createAnimation();
    enterAnimation
      .addElement(effectElement)
      .delay(70)
      .beforeStyles({
        width: `${tabSelectedElement.clientWidth}px`,
        height: `${tabSelectedElement.clientHeight}px`,
        display: 'block',
      })
      .beforeAddWrite(() => {
        tabSelectedElement.childNodes.forEach((node) => {
          effectElement.appendChild(node.cloneNode(true));
        });
        currentTouchedElement!.classList.add('ion-activated');
        currentTouchedElement!.click();
      });

    if (currentTouchedElement === tabSelectedElement) {
      enterAnimation
        .keyframes([
          {
            transform: `${startTransform} ${scales.small}`,
            opacity: 1,
            offset: 0,
          },
          {
            transform: `${middleTransform} ${scales.large}`,
            opacity: 1,
            offset: 0.6,
          },
          {
            transform: `${endTransform} ${scales.medium}`,
            opacity: 1,
            offset: 1,
          },
        ])
        .duration(480);
    } else {
      enterAnimation
        .keyframes([
          {
            transform: `${startTransform} ${scales.small}`,
            opacity: 1,
            offset: 0,
          },
          {
            transform: `${middleTransform} ${scales.large}`,
            opacity: 1,
            offset: 0.5,
          },
          {
            transform: `${endTransform} ${scales.medium}`,
            opacity: 1,
            offset: 1,
          },
        ])
        .duration(320);
    }
    animationLatestX = detail.currentX;
    enterAnimationPromise = enterAnimation.play().then(() => {
      enterAnimationPromise = undefined;
    });
    return true;
  };

  const onMoveGesture = (detail: GestureDetail): boolean | undefined => {
    if (currentTouchedElement === undefined || enterAnimationPromise || moveAnimationPromise) {
      return true; // Skip Animation
    }

    const startTransform = getTransform(animationLatestX!, effectElementPositionY!, currentTouchedElement);
    const endTransform = getTransform(detail.currentX, effectElementPositionY!, currentTouchedElement);

    // Move用のアニメーションオブジェクトを初回のみ作成し、再利用する
    if (!moveAnimation) {
      moveAnimation = createAnimation();
      moveAnimation
        .addElement(effectElement)
        .duration(800)
        .easing('ease-in-out')
        .keyframes([
          {
            transform: `${startTransform} ${scales.medium}`,
            opacity: 1,
            offset: 0,
          },
          {
            transform: `${startTransform} ${scales.xlarge}`,
            opacity: 1,
            offset: 0.2,
          },
          {
            transform: `${endTransform} ${scales.medium}`,
            opacity: 1,
            offset: 1,
          },
        ]);
    } else {
      moveAnimation.duration(0).keyframes([
        {
          transform: `${endTransform} ${scales.medium}`,
          opacity: 1,
          offset: 1,
        },
        {
          transform: `${endTransform} ${scales.medium}`,
          opacity: 1,
          offset: 1,
        },
      ]);
    }
    animationLatestX = detail.currentX;
    moveAnimationPromise = moveAnimation.play().then(() => {
      moveAnimationPromise = undefined;
    });
    return true;
  };

  const onEndGesture = (currentTime: number): boolean | undefined => {
    // タイマーをクリア（正常にonEndGestureが実行された場合）
    if (clearActivatedTimer !== undefined) {
      clearTimeout(clearActivatedTimer);
      clearActivatedTimer = undefined;
    }

    if (currentTouchedElement === undefined) {
      return false;
    }

    const transform = getTransform(animationLatestX!, effectElementPositionY!, currentTouchedElement);

    const leaveAnimation = createAnimation();
    leaveAnimation.addElement(effectElement);
    leaveAnimation
      .onFinish(() => clearActivated())
      .easing('ease-in')
      .duration(80)
      .keyframes([
        {
          transform: `${transform} ${scales.medium}`,
          opacity: 1,
        },
        {
          transform: `${transform} ${scales.small}`,
          opacity: 0,
        },
      ]);
    (async () => {
      // Wait for enter animation to complete before playing leave animation
      if (enterAnimationPromise) {
        await enterAnimationPromise;
      }
      leaveAnimation.play();
    })();
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
      targetElement.classList.remove(GestureName);
    },
  };
};
