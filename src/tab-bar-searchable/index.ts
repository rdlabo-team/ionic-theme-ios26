import { createAnimation, Animation } from '@ionic/core';
import {
  ANIMATION_DELAY_BASE,
  ANIMATION_DURATION,
  ANIMATION_EASING,
  getElementReferences,
  getElementSizes,
  throwErrorByFailedToGet,
} from './utils';
import { cloneElement } from '../utils';
import { ElementReferences, ElementSizes, SearchableEventCache, TabBarSearchableFunction, TabBarSearchableType } from './interfaces';
import {
  createCloseButtonsAnimation,
  createEffectAnimation,
  createFabButtonAnimation,
  createSearchContainerAnimation,
  createTabBarAnimation,
} from './animations/enter';
import {
  createReverseCloseButtonsAnimation,
  createReverseEffectAnimation,
  createReverseFabButtonAnimation,
  createReverseSearchContainerAnimation,
  createReverseTabBarAnimation,
} from './animations/leave';
export * from './interfaces';

/**
 <ion-footer [translucent]="true">
  <ion-toolbar>
    <ion-buttons slot="start">
    <!-- ion-icon does not need `name` attribute. -->
      <ion-button fill="default"><ion-icon slot="icon-only"></ion-icon>
    </ion-button>
    </ion-buttons>
    <!-- User set `ionChange` or other events. -->
    <ion-searchbar (ionChange)="example($event)"></ion-searchbar>
  </ion-toolbar>
 </ion-footer>
**/

export const attachTabBarSearchable = (
  ionTabBar: HTMLElement,
  ionFabButton: HTMLElement,
  ionFooter: HTMLElement,
): TabBarSearchableFunction => {
  if (!ionTabBar || !ionFabButton || !ionFooter) {
    throw new Error('TabBarSearchable should be defined with props');
  }
  // Initialize
  ionFooter.style.pointerEvents = 'none';
  ionFooter.style.opacity = '0';
  ionTabBar.style.transformOrigin = 'left center';

  // Saved Params
  let searchableEventCache: SearchableEventCache | undefined;

  return (event: MouseEvent, type: TabBarSearchableType) => {
    if (type === TabBarSearchableType.Searchable) {
      searchableEventCache = searchableEvent(event, ionTabBar, ionFabButton, ionFooter);
    } else {
      defaultEvent(event, searchableEventCache!, ionTabBar, ionFabButton, ionFooter);
    }
  };
};

/**
 * 検索可能状態へのアニメーション処理
 */
const searchableEvent = (
  event: MouseEvent,
  ionTabBar: HTMLElement,
  ionFabButton: HTMLElement,
  ionFooter: HTMLElement,
): SearchableEventCache => {
  if (!(event.target as HTMLElement)?.closest('ion-fab-button')) {
    throw throwErrorByFailedToGet('ion-fab-button');
  }

  // DOM要素とサイズ情報を取得
  const references = getElementReferences(ionTabBar, ionFooter);
  const sizes = getElementSizes(ionTabBar, ionFabButton, references);
  const colorSelected = references.selectedTabButton
    ? getComputedStyle(references.selectedTabButton).getPropertyValue('--color-selected').trim()
    : '';

  // 各アニメーションを作成
  const effectAnimation = createEffectAnimation(references, sizes);
  const searchContainerAnimation = createSearchContainerAnimation(references, sizes);
  const closeButtonsAnimation = createCloseButtonsAnimation(references);
  const tabBarAnimation = createTabBarAnimation(ionTabBar, references, sizes);
  const fabButtonAnimation = createFabButtonAnimation(ionFabButton);

  // ベースアニメーションを作成して実行
  const toolbar = ionFooter.querySelector('ion-toolbar');
  if (!toolbar) {
    throw throwErrorByFailedToGet('ion-toolbar');
  }

  createAnimation()
    .addElement(toolbar)
    .fromTo('opacity', '0', '1')
    .delay(ANIMATION_DELAY_BASE)
    .duration(ANIMATION_DURATION)
    .easing(ANIMATION_EASING)
    .addElement(ionFooter)
    .afterAddWrite(() => (ionFooter.style.pointerEvents = 'auto'))
    .fromTo('opacity', '0.8', '1')
    .addAnimation([tabBarAnimation, fabButtonAnimation, searchContainerAnimation, effectAnimation, closeButtonsAnimation])
    .play();
  return {
    elementSizes: sizes,
    colorSelected,
  };
};

/**
 * デフォルト状態への戻りアニメーション処理
 */
const defaultEvent = (
  event: MouseEvent,
  searchableEventCache: SearchableEventCache,
  ionTabBar: HTMLElement,
  ionFabButton: HTMLElement,
  ionFooter: HTMLElement,
): void => {
  // DOM要素とサイズ情報を取得
  const references = getElementReferences(ionTabBar, ionFooter);

  // 各アニメーションを作成（逆の動作）
  const effectAnimation = createReverseEffectAnimation(references, searchableEventCache.elementSizes, searchableEventCache.colorSelected);
  const searchContainerAnimation = createReverseSearchContainerAnimation(references, searchableEventCache.elementSizes);
  const closeButtonsAnimation = createReverseCloseButtonsAnimation(references);
  const tabBarAnimation = createReverseTabBarAnimation(ionTabBar, references, searchableEventCache.elementSizes);
  const fabButtonAnimation = createReverseFabButtonAnimation(ionFabButton, searchableEventCache.elementSizes);

  // ベースアニメーションを作成して実行
  const toolbar = ionFooter.querySelector('ion-toolbar');
  if (!toolbar) {
    throw throwErrorByFailedToGet('ion-toolbar');
  }

  createAnimation()
    .addElement(toolbar)
    .fromTo('opacity', '1', '0')
    .delay(ANIMATION_DELAY_BASE)
    .duration(ANIMATION_DURATION)
    .easing(ANIMATION_EASING)
    .addElement(ionFooter)
    .afterAddWrite(() => {
      ionFooter.style.pointerEvents = 'none';
      ionFooter.style.opacity = '0';
    })
    .fromTo('opacity', '1', '0')
    .addAnimation([tabBarAnimation, fabButtonAnimation, searchContainerAnimation, effectAnimation, closeButtonsAnimation])
    .play();
};
