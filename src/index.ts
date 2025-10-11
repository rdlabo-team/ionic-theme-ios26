import { createGesture, GestureDetail, createAnimation } from '@ionic/core';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { Gesture } from '@ionic/core/dist/types/utils/gesture';

export const registerTabBarEffect = (ionTabBar: HTMLElement): Gesture => {
  let gesture!: Gesture;
  let currentTouchedButton: HTMLIonTabButtonElement | null;
  let gestureMoveStartTime: number | null;
  let tabEffectElY: number | null;

  const tabEffectEl = cloneElement('ion-tab-button');
  const GestureName = 'tab-bar-gesture';
  const MinScale = 'scale(1.1)';
  const MiddleScale = 'scale(1.2)';
  const MaxScale = 'scale(1.3)';
  const OverScale = 'scale(1.4)';

  ionTabBar.addEventListener('pointerdown', () => clearActivated());

  const createTabButtonGesture = () => {
    ionTabBar.classList.add('tab-bar-ios26-effect');
    gesture = createGesture({
      el: ionTabBar,
      threshold: 0,
      gestureName: GestureName,
      onStart: (event) => {
        enterTabButtonAnimation(event)?.play();
      },
      onMove: (event) => {
        moveTabButtonAnimation(event)?.play();
      },
      onEnd: (event) => {
        leaveTabButtonAnimation(event).then((animation) => animation?.play());
      },
    });
    gesture.enable(true);
  };
  createTabButtonGesture();

  const clearActivated = (isAfterAddWrite = false) => {
    if (currentTouchedButton) {
      tabEffectEl.style.display = 'none';
      tabEffectEl.innerHTML = '';
      tabEffectEl.style.top = 'auto';
      tabEffectEl.style.top = 'left';
      tabEffectEl.style.transform = 'none';

      currentTouchedButton!.classList.remove('ion-activated');
      if (isAfterAddWrite) {
        currentTouchedButton.click();
      }

      /**
       * もしこの処理がafterAddWrite以外で走る場合、正常に終了していない
       */
      if (!isAfterAddWrite) {
        gesture.destroy();
        createTabButtonGesture();
      }
      currentTouchedButton = null;
    }
  };

  const getTransform = (detailCurrentX: number, tabSelectedActual: Element): string => {
    const diff = -2;
    const currentX = detailCurrentX - tabSelectedActual.clientWidth / 2;
    const maxLeft = tabSelectedActual.getBoundingClientRect().left + diff;
    const maxRight = tabSelectedActual.getBoundingClientRect().right - diff - tabSelectedActual.clientWidth;

    if (maxLeft < currentX && currentX < maxRight) {
      return `translate3d(${currentX}px, ${tabEffectElY}px, 0)`;
    }
    if (maxLeft > currentX) {
      return `translate3d(${maxLeft}px, ${tabEffectElY}px, 0)`;
    }
    return `translate3d(${maxRight}px, ${tabEffectElY}px, 0)`;
  };

  const enterTabButtonAnimation = (detail: GestureDetail): Animation | undefined => {
    currentTouchedButton = (detail.event.target as HTMLElement).closest('ion-tab-button');
    const tabSelectedActual = ionTabBar.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return undefined;
    }

    tabEffectElY = tabSelectedActual.getBoundingClientRect().top;
    const startTransform = getTransform(
      tabSelectedActual.getBoundingClientRect().left + tabSelectedActual.clientWidth / 2,
      tabSelectedActual,
    );
    const middleTransform = getTransform(
      (tabSelectedActual.getBoundingClientRect().left + tabSelectedActual.clientWidth / 2 + detail.currentX) / 2,
      currentTouchedButton,
    );
    const endTransform = getTransform(detail.currentX, currentTouchedButton);
    const tabButtonAnimation = createAnimation();
    tabButtonAnimation
      .addElement(tabEffectEl)
      .delay(70)
      .beforeStyles({
        width: `${tabSelectedActual.clientWidth}px`,
        height: `${tabSelectedActual.clientHeight}px`,
        display: 'block',
      })
      .beforeAddWrite(() => {
        tabSelectedActual.childNodes.forEach((node) => {
          tabEffectEl.appendChild(node.cloneNode(true));
        });
        currentTouchedButton!.classList.add('ion-activated');
      });

    if (currentTouchedButton === tabSelectedActual) {
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

    return tabButtonAnimation;
  };

  const moveTabButtonAnimation = (detail: GestureDetail): Animation | undefined => {
    if (gestureMoveStartTime) {
      if (detail.currentTime < gestureMoveStartTime) {
        return undefined;
      }
    }
    const tabSelectedActual = ionTabBar.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return undefined;
    }

    const transform = getTransform(detail.currentX, currentTouchedButton);

    const tabButtonAnimation = createAnimation();
    tabButtonAnimation.addElement(tabEffectEl);
    tabButtonAnimation.duration(50).keyframes([
      {
        transform: `${transform} ${MaxScale}`,
      },
      {
        transform: `${transform} ${MaxScale}`,
      },
    ]);
    return tabButtonAnimation;
  };

  const leaveTabButtonAnimation = async (detail: GestureDetail): Promise<Animation | undefined> => {
    if (gestureMoveStartTime) {
      if (detail.currentTime < gestureMoveStartTime) {
        await new Promise((resolve) => setTimeout(resolve, gestureMoveStartTime! - detail.currentTime));
      }
    }
    const tabSelectedActual = ionTabBar.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return undefined;
    }

    const endTransform = getTransform(
      currentTouchedButton.getBoundingClientRect().left + currentTouchedButton.clientWidth / 2,
      currentTouchedButton,
    );

    const tabButtonAnimation = createAnimation();
    tabButtonAnimation.addElement(tabEffectEl);
    tabButtonAnimation
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
    return tabButtonAnimation;
  };

  return gesture;
};

const cloneElement = (tagName: string): HTMLElement => {
  const getCachedEl = document.querySelector(`${tagName}.ion-cloned-element`);
  if (getCachedEl !== null) {
    return getCachedEl as HTMLElement;
  }

  const clonedEl = document.createElement(tagName) as HTMLElement;
  clonedEl.classList.add('ion-cloned-element');
  clonedEl.style.setProperty('display', 'none');
  document.body.appendChild(clonedEl);

  return clonedEl;
};
