import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, ViewDidEnter } from '@ionic/angular/standalone';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { createAnimation } from '@ionic/angular/standalone';
import { createGesture, GestureDetail } from '@ionic/angular';
import type { Animation } from '@ionic/core/dist/types/utils/animation/animation-interface';
import { Gesture } from '@ionic/core/dist/types/utils/gesture';

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

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit, ViewDidEnter {
  readonly #router = inject(Router);
  readonly #el = inject(ElementRef);
  ngOnInit() {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((params) => {
      const tabBar = this.#el.nativeElement.querySelector('ion-tab-bar');
      if (!tabBar) {
        return;
      }
      if (['/main/settings'].includes(params.urlAfterRedirects)) {
        tabBar.classList.add('tab-bar-hidden');
      } else if (tabBar) {
        tabBar.classList.remove('tab-bar-hidden');
      }
    });
  }

  ionViewDidEnter() {
    registerTabBarEffect();
  }
}

/**
 * Experimental
 */
const registerTabBarEffect = () => {
  let gesture: Gesture;
  let currentTouchedButton: HTMLIonTabButtonElement | null;
  const tabEffectEl = cloneElement('ion-tab-button');
  const ionTabBar = document.querySelector('ion-tab-bar') as HTMLElement;
  const GestureName = 'tab-bar-gesture';
  const MinScale = 'scale(1.1)';
  const MaxScale = 'scale(1.42)';

  ionTabBar.addEventListener('pointerdown', () => {
    clearActivated();
  });

  const createTabButtonGesture = () => {
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
        leaveTabButtonAnimation(event)?.play();
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
    const transformY = tabSelectedActual.getBoundingClientRect().top;

    if (maxLeft < currentX && currentX < maxRight) {
      return `translate3d(${currentX}px, ${transformY}px, 0)`;
    }
    if (maxLeft > currentX) {
      return `translate3d(${maxLeft}px, ${transformY}px, 0)`;
    }
    return `translate3d(${maxRight}px, ${transformY}px, 0)`;
  };

  const enterTabButtonAnimation = (detail: GestureDetail): Animation | undefined => {
    currentTouchedButton = (detail.event.target as HTMLElement).closest('ion-tab-button');
    const tabSelectedActual = document.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return undefined;
    }

    const startTransform = getTransform(
      tabSelectedActual.getBoundingClientRect().left + tabSelectedActual.clientWidth / 2,
      tabSelectedActual,
    );
    const endTransform = getTransform(detail.currentX, tabSelectedActual);
    const tabButtonAnimation = createAnimation();
    tabButtonAnimation.addElement(tabEffectEl);
    tabButtonAnimation
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
      })
      .duration(70)
      .keyframes([
        {
          transform: `${startTransform} ${MinScale}`,
          opacity: 1,
        },
        {
          transform: `${endTransform} ${MaxScale}`,
          opacity: 1,
        },
      ]);
    return tabButtonAnimation;
  };

  const moveTabButtonAnimation = (detail: GestureDetail): Animation | undefined => {
    const tabSelectedActual = document.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return undefined;
    }

    const transform = getTransform(detail.currentX, tabSelectedActual);

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

  const leaveTabButtonAnimation = (detail: GestureDetail): Animation | undefined => {
    const tabSelectedActual = document.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return undefined;
    }

    const startTransform = getTransform(detail.currentX, tabSelectedActual);
    const endTransform = getTransform(
      tabSelectedActual.getBoundingClientRect().left + tabSelectedActual.clientWidth / 2,
      tabSelectedActual,
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
};
