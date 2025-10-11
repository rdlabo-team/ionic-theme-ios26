import { createGesture, GestureDetail, createAnimation } from '@ionic/core';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { Gesture, GestureCallback } from '@ionic/core/dist/types/utils/gesture';
import { cloneElement, getTransform } from './utils';

const GestureName = 'tab-bar-gesture';
const MinScale = 'scale(1.1)';
const MiddleScale = 'scale(1.2)';
const MaxScale = 'scale(1.3)';
const OverScale = 'scale(1.4)';

export const registerTabBarEffect = (ionTabBar: HTMLElement): Gesture | undefined => {
  if (!ionTabBar.classList.contains('ios')) {
    return undefined;
  }

  let gesture!: Gesture;
  let currentTouchedElement: HTMLIonTabButtonElement | undefined;
  let gestureMoveStartTime: number | undefined;
  let tabEffectPositionY: number | undefined;

  const tabEffectElement = cloneElement('ion-tab-button');
  ionTabBar.addEventListener('pointerdown', () => clearActivated());

  const createTabButtonGesture = () => {
    ionTabBar.classList.add('tab-bar-ios26-effect');
    gesture = createGesture({
      el: ionTabBar,
      threshold: 0,
      gestureName: GestureName,
      onStart: (event) => enterTabButtonAnimation(event),
      onMove: (event) => moveTabButtonAnimation(event),
      onEnd: (event) => leaveTabButtonAnimation(event),
    });
    gesture.enable(true);
  };
  createTabButtonGesture();

  const clearActivated = (isAfterAddWrite = false) => {
    if (currentTouchedElement) {
      tabEffectElement.style.display = 'none';
      tabEffectElement.innerHTML = '';
      tabEffectElement.style.top = 'auto';
      tabEffectElement.style.top = 'left';
      tabEffectElement.style.transform = 'none';

      currentTouchedElement!.classList.remove('ion-activated');
      if (isAfterAddWrite) {
        currentTouchedElement.click();
      }

      /**
       * もしこの処理がafterAddWrite以外で走る場合、正常に終了していない
       */
      if (!isAfterAddWrite) {
        gesture.destroy();
        createTabButtonGesture();
      }
      currentTouchedElement = undefined;
    }
  };

  const enterTabButtonAnimation = (detail: GestureDetail): boolean | undefined => {
    currentTouchedElement = (detail.event.target as HTMLElement).closest('ion-tab-button') || undefined;
    const tabSelectedElement = ionTabBar.querySelector('ion-tab-button.tab-selected');
    if (currentTouchedElement === undefined || tabSelectedElement === null) {
      return false;
    }
    tabEffectPositionY = tabSelectedElement.getBoundingClientRect().top;

    const startTransform = getTransform(
      tabSelectedElement.getBoundingClientRect().left + tabSelectedElement.clientWidth / 2,
      tabEffectPositionY,
      tabSelectedElement,
    );
    const middleTransform = getTransform(
      (tabSelectedElement.getBoundingClientRect().left + tabSelectedElement.clientWidth / 2 + detail.currentX) / 2,
      tabEffectPositionY,
      currentTouchedElement,
    );
    const endTransform = getTransform(detail.currentX, tabEffectPositionY, currentTouchedElement);
    const tabButtonAnimation = createAnimation();
    tabButtonAnimation
      .addElement(tabEffectElement)
      .delay(70)
      .beforeStyles({
        width: `${tabSelectedElement.clientWidth}px`,
        height: `${tabSelectedElement.clientHeight}px`,
        display: 'block',
      })
      .beforeAddWrite(() => {
        tabSelectedElement.childNodes.forEach((node) => {
          tabEffectElement.appendChild(node.cloneNode(true));
        });
        currentTouchedElement!.classList.add('ion-activated');
      });

    if (currentTouchedElement === tabSelectedElement) {
      tabButtonAnimation
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
      tabButtonAnimation
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
    tabButtonAnimation.play();
    return true;
  };

  const moveTabButtonAnimation = (detail: GestureDetail): boolean | undefined => {
    if (currentTouchedElement === undefined || (gestureMoveStartTime && detail.currentTime < gestureMoveStartTime)) {
      return true; // Skip Animation
    }

    const transform = getTransform(detail.currentX, tabEffectPositionY!, currentTouchedElement);

    const tabButtonAnimation = createAnimation();
    tabButtonAnimation.addElement(tabEffectElement);
    tabButtonAnimation.duration(50).keyframes([
      {
        transform: `${transform} ${MaxScale}`,
      },
      {
        transform: `${transform} ${MaxScale}`,
      },
    ]);
    tabButtonAnimation.play();
    return true;
  };

  const leaveTabButtonAnimation = (detail: GestureDetail): boolean | undefined => {
    if (currentTouchedElement === undefined) {
      return false;
    }

    const endTransform = getTransform(
      currentTouchedElement.getBoundingClientRect().left + currentTouchedElement.clientWidth / 2,
      tabEffectPositionY!,
      currentTouchedElement,
    );

    const tabButtonAnimation = createAnimation();
    tabButtonAnimation.addElement(tabEffectElement);
    tabButtonAnimation
      .delay(gestureMoveStartTime! - detail.currentTime)
      .onFinish(() => clearActivated(true))
      .duration(50)
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
    tabButtonAnimation.play();
    return true;
  };

  return gesture;
};
