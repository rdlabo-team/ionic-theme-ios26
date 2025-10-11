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
    createTabBarGesture();
  }
}

/**
 * Experimental
 */
const createTabBarGesture = () => {
  let gesture: Gesture;
  let currentTouchedButton: HTMLIonTabButtonElement | null;
  const tabEffectEl = cloneElement('ion-tab-button');
  const ionTabBar = document.querySelector('ion-tab-bar') as HTMLElement;
  const gestureName = 'tab-bar-gesture';

  ionTabBar.addEventListener('pointerdown', () => {
    clearActivated();
  });

  const createTabButtonGesture = () => {
    gesture = createGesture({
      el: ionTabBar,
      threshold: 0,
      gestureName,
      onStart: (event) => enterTabButtonAnimation(event),
      onEnd: (event) => leaveTabButtonAnimation(event),
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

  const enterTabButtonAnimation = (detail: GestureDetail) => {
    currentTouchedButton = (detail.event.target as HTMLElement).closest('ion-tab-button');
    const tabSelectedActual = document.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return;
    }

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
          transform: 'scale(1.1)',
          left: `${tabSelectedActual.getBoundingClientRect().left}px`,
          top: `${tabSelectedActual.getBoundingClientRect().top}px`,
          opacity: 1,
        },
        {
          transform: 'scale(1.42)',
          left: `${currentTouchedButton!.getBoundingClientRect().left}px`,
          top: `${currentTouchedButton!.getBoundingClientRect().top}px`,
          opacity: 1,
        },
      ]);

    tabButtonAnimation.play();
  };

  const leaveTabButtonAnimation = (detail: GestureDetail) => {
    const tabSelectedActual = document.querySelector('ion-tab-button.tab-selected');
    if (tabSelectedActual === null || currentTouchedButton === null) {
      return;
    }

    const tabButtonAnimation = createAnimation();
    tabButtonAnimation.addElement(tabEffectEl);
    tabButtonAnimation
      .afterAddWrite(() => clearActivated(true))
      .duration(50)
      .keyframes([
        {
          transform: 'scale(1.42)',
          left: `${currentTouchedButton!.getBoundingClientRect().left}px`,
          top: `${currentTouchedButton!.getBoundingClientRect().top}px`,
          opacity: 1,
        },
        {
          transform: 'scale(1.1)',
          left: `${currentTouchedButton!.getBoundingClientRect().left}px`,
          top: `${currentTouchedButton!.getBoundingClientRect().top}px`,
          opacity: 0,
        },
      ]);

    tabButtonAnimation.play();
  };
};
