import { createGesture, GestureDetail, createAnimation } from '@ionic/core';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { Gesture } from '@ionic/core/dist/types/utils/gesture';
import { cloneElement, getTransform } from './utils';

const GestureName = 'enable-ios26-gesture';
const MinScale = 'scale(1.1)';
const MiddleScale = 'scale(1.2)';
const MaxScale = 'scale(1.3)';
const OverScale = 'scale(1.4)';

export interface registeredEffect {
  destroy: () => void;
}

export const registerSegmentEffect = (targetElement: HTMLElement): registeredEffect | undefined => {
  return registerEffect(targetElement, 'ion-segment-button', 'segment-button-checked');
};

export const registerTabBarEffect = (targetElement: HTMLElement): registeredEffect | undefined => {
  return registerEffect(targetElement, 'ion-tab-button', 'tab-selected');
};

const registerEffect = (targetElement: HTMLElement, effectTagName: string, selectedClassName: string): registeredEffect | undefined => {
  if (!targetElement.classList.contains('ios')) {
    return undefined;
  }

  let gesture!: Gesture;
  let currentTouchedElement: HTMLElement | undefined;
  let gestureMoveStartTime: number | undefined;
  let effectElementPositionY: number | undefined;
  let moveAnimation: Animation | undefined;
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

  const clearActivated = (isAfterAddWrite = false) => {
    if (!currentTouchedElement) {
      return;
    }
    requestAnimationFrame(() => {
      effectElement.style.display = 'none';
      effectElement.innerHTML = '';
      effectElement.style.top = 'auto';
      effectElement.style.top = 'left';
      effectElement.style.transform = 'none';
    });

    currentTouchedElement!.classList.remove('ion-activated');
    if (isAfterAddWrite) {
      currentTouchedElement.click();
    }

    currentTouchedElement = undefined;
    moveAnimation = undefined; // 次回のために破棄
  };

  const onStartGesture = (detail: GestureDetail): boolean | undefined => {
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
      });

    if (currentTouchedElement === tabSelectedElement) {
      enterAnimation
        .keyframes([
          {
            transform: `${startTransform} ${MinScale}`,
            opacity: 1,
            offset: 0,
          },
          {
            transform: `${middleTransform} ${MiddleScale}`,
            opacity: 1,
            offset: 0.6,
          },
          {
            transform: `${endTransform} ${MaxScale}`,
            opacity: 1,
            offset: 1,
          },
        ])
        .duration(120);
      gestureMoveStartTime = detail.currentTime + 120;
    } else {
      enterAnimation
        .keyframes([
          {
            transform: `${startTransform} ${MinScale}`,
            opacity: 1,
            offset: 0,
          },
          {
            transform: `${middleTransform} ${MiddleScale}`,
            opacity: 1,
            offset: 0.4,
          },
          {
            transform: `${endTransform} ${MaxScale}`,
            opacity: 1,
            offset: 0.55,
          },
          {
            transform: `${endTransform} ${OverScale}`,
            opacity: 1,
            offset: 0.75,
          },
          {
            transform: `${endTransform} ${MaxScale}`,
            opacity: 1,
            offset: 1,
          },
        ])
        .duration(480);
      gestureMoveStartTime = detail.currentTime + 480;
    }
    enterAnimation.play();
    return true;
  };

  const onMoveGesture = (detail: GestureDetail): boolean | undefined => {
    if (currentTouchedElement === undefined || (gestureMoveStartTime && detail.currentTime < gestureMoveStartTime)) {
      return true; // Skip Animation
    }

    const transform = getTransform(detail.currentX, effectElementPositionY!, currentTouchedElement);

    // Move用のアニメーションオブジェクトを初回のみ作成し、再利用する
    if (!moveAnimation) {
      moveAnimation = createAnimation();
      moveAnimation.addElement(effectElement).duration(50);
    }

    moveAnimation.keyframes([
      {
        transform: `${transform} ${MaxScale}`,
      },
      {
        transform: `${transform} ${MaxScale}`,
      },
    ]);
    moveAnimation.play();
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

    const endTransform = getTransform(
      currentTouchedElement.getBoundingClientRect().left + currentTouchedElement.clientWidth / 2,
      effectElementPositionY!,
      currentTouchedElement,
    );

    const leaveAnimation = createAnimation();
    leaveAnimation.addElement(effectElement);
    leaveAnimation
      .onFinish(() => clearActivated(true))
      .duration(140)
      .keyframes([
        {
          transform: `${endTransform} ${MaxScale}`,
          opacity: 1,
        },
        {
          transform: `${endTransform} ${MinScale}`,
          opacity: 0,
        },
      ]);
    (async () => {
      if (gestureMoveStartTime && currentTime < gestureMoveStartTime) {
        await new Promise((resolve) => setTimeout(resolve, gestureMoveStartTime! - currentTime));
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
