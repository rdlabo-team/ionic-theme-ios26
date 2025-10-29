import { createAnimation, Animation } from '@ionic/core';
import { getElementReferences, getElementSizes, throwErrorByFailedToGet } from './utils';
import { cloneElement } from '../utils';
import { ElementReferences, ElementSizes, TabBarSearchableFunction, TabBarSearchableType } from './interfaces';
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

// アニメーション定数
const ANIMATION_DURATION = 600;
const ANIMATION_DELAY_BASE = 140;
const ANIMATION_DELAY_CLOSE_BUTTONS = 240;
const ANIMATION_EASING = 'cubic-bezier(0, 1, 0.22, 1)';
const OPACITY_TRANSITION = 'opacity 140ms ease';

/**
 * エフェクトアニメーションを作成
 */
const createEffectAnimation = (references: ElementReferences, sizes: ElementSizes): Animation => {
  const effectElement = cloneElement('ion-icon');
  const closeButtonRect = references.closeButtonIcon?.getBoundingClientRect();
  const iconName = references.selectedTabButtonIcon?.getAttribute('name');
  const selectedTabButtonIconRect = references.selectedTabButtonIcon?.getBoundingClientRect();

  return createAnimation()
    .addElement(effectElement)
    .beforeAddWrite(() => {
      effectElement.style.display = 'inline-block';
      references.closeButtonIcon!.style.opacity = '0';
      if (iconName && closeButtonRect) {
        effectElement.setAttribute('name', iconName);
        effectElement.style.width = `${closeButtonRect.width}px`;
        effectElement.style.height = `${closeButtonRect.height}px`;
      }
    })
    .afterAddWrite(() => {
      effectElement.style.display = 'none';
      references.closeButtonIcon!.style.opacity = '1';
    })
    .fromTo(
      'transform',
      `translate3d(${selectedTabButtonIconRect!.left}px, ${selectedTabButtonIconRect!.top}px, 0)`,
      `translate3d(${closeButtonRect!.left}px, ${closeButtonRect!.top}px, 0)`,
    );
};

/**
 * 逆エフェクトアニメーションを作成
 */
const createReverseEffectAnimation = (references: ElementReferences, sizes: ElementSizes): Animation => {
  const effectElement = cloneElement('ion-icon');
  const closeButtonRect = references.closeButtonIcon?.getBoundingClientRect();
  const iconName = references.selectedTabButtonIcon?.getAttribute('name');
  const selectedTabButtonIconRect = references.selectedTabButtonIcon?.getBoundingClientRect();

  return createAnimation()
    .addElement(effectElement)
    .beforeAddWrite(() => {
      effectElement.style.display = 'inline-block';
      references.closeButtonIcon!.style.opacity = '0';
      if (iconName && closeButtonRect) {
        effectElement.setAttribute('name', iconName);
        effectElement.style.width = `${closeButtonRect.width}px`;
        effectElement.style.height = `${closeButtonRect.height}px`;
      }
    })
    .afterAddWrite(() => {
      effectElement.style.display = 'none';
      references.closeButtonIcon!.style.opacity = '1';
    })
    .fromTo(
      'transform',
      `translate3d(${closeButtonRect!.left}px, ${closeButtonRect!.top}px, 0)`,
      `translate3d(${selectedTabButtonIconRect!.left}px, ${selectedTabButtonIconRect!.top}px, 0)`,
    );
};

/**
 * 検索コンテナアニメーションを作成
 */
const createSearchContainerAnimation = (references: ElementReferences, sizes: ElementSizes): Animation => {
  return createAnimation()
    .addElement(references.searchContainer)
    .beforeAddWrite(() => (references.searchContainer.style.transformOrigin = 'right center'))
    .fromTo(
      'transform',
      `scale(${sizes.fabButton.width / sizes.searchContainer.width}, ${sizes.fabButton.height / sizes.searchContainer.height})`,
      'scale(1)',
    )
    .fromTo('opacity', '0.2', '1');
};

/**
 * 逆検索コンテナアニメーションを作成
 */
const createReverseSearchContainerAnimation = (references: ElementReferences, sizes: ElementSizes): Animation => {
  return createAnimation()
    .addElement(references.searchContainer)
    .beforeAddWrite(() => (references.searchContainer.style.transformOrigin = 'right center'))
    .fromTo(
      'transform',
      'scale(1)',
      `scale(${sizes.fabButton.width / sizes.searchContainer.width}, ${sizes.fabButton.height / sizes.searchContainer.height})`,
    )
    .fromTo('opacity', '1', '0.2');
};

/**
 * 閉じるボタンアニメーションを作成
 */
const createCloseButtonsAnimation = (references: ElementReferences): Animation => {
  return createAnimation()
    .delay(ANIMATION_DELAY_CLOSE_BUTTONS)
    .addElement(references.closeButtons)
    .beforeAddWrite(() => (references.closeButtons.style.transformOrigin = 'left center'))
    .afterClearStyles(['transform', 'transform-origin'])
    .fromTo('transform', 'scale(1.5, 1)', 'scale(1)');
};

/**
 * 逆閉じるボタンアニメーションを作成
 */
const createReverseCloseButtonsAnimation = (references: ElementReferences): Animation => {
  return createAnimation()
    .delay(ANIMATION_DELAY_CLOSE_BUTTONS)
    .addElement(references.closeButtons)
    .beforeAddWrite(() => (references.closeButtons.style.transformOrigin = 'left center'))
    .afterClearStyles(['transform', 'transform-origin'])
    .fromTo('transform', 'scale(1)', 'scale(1.5, 1)');
};

/**
 * タブバーアニメーションを作成
 */
const createTabBarAnimation = (ionTabBar: HTMLElement, references: ElementReferences, sizes: ElementSizes): Animation => {
  return createAnimation()
    .addElement(ionTabBar)
    .beforeAddWrite(() => {
      ionTabBar.querySelectorAll<HTMLElement>('ion-tab-button').forEach((element: HTMLElement) => {
        element.style.transition = OPACITY_TRANSITION;
        element.style.opacity = '0';
      });

      if (references.selectedTabButton) {
        references.selectedTabButton.classList.add('ios26-tab-selected');
        references.selectedTabButton.classList.remove('tab-selected');

        const iconName = references.selectedTabButtonIcon?.getAttribute('name');
        if (iconName) {
          references.closeButtonIcon?.setAttribute('name', iconName);
        }
      }
    })
    .afterAddWrite(() => {
      const selected = ionTabBar.querySelector<HTMLElement>('ion-tab-button.ios26-tab-selected');
      if (selected) {
        selected.classList.add('tab-selected');
        selected.classList.remove('ios26-tab-selected');
      }
      ionTabBar.style.pointerEvents = 'none';
    })
    .fromTo(
      'transform',
      'scale(1)',
      `scale(${sizes.closeButton.width / sizes.tabBar.width}, ${sizes.closeButton.height / sizes.tabBar.height})`,
    )
    .fromTo('opacity', '1', '0');
};

/**
 * 逆タブバーアニメーションを作成
 */
const createReverseTabBarAnimation = (ionTabBar: HTMLElement, references: ElementReferences, sizes: ElementSizes): Animation => {
  return createAnimation()
    .addElement(ionTabBar)
    .beforeAddWrite(() => {
      ionTabBar.style.pointerEvents = 'auto';
    })
    .afterAddWrite(() => {
      ionTabBar.querySelectorAll<HTMLElement>('ion-tab-button').forEach((element: HTMLElement) => {
        element.style.transition = OPACITY_TRANSITION;
        element.style.opacity = '1';
      });

      const selected = ionTabBar.querySelector<HTMLElement>('ion-tab-button.ios26-tab-selected');
      if (selected) {
        selected.classList.add('tab-selected');
        selected.classList.remove('ios26-tab-selected');
      }
    })
    .fromTo(
      'transform',
      `scale(${sizes.closeButton.width / sizes.tabBar.width}, ${sizes.closeButton.height / sizes.tabBar.height})`,
      'scale(1)',
    )
    .fromTo('opacity', '0', '1');
};

/**
 * FABボタンアニメーションを作成
 */
const createFabButtonAnimation = (ionFabButton: HTMLElement): Animation => {
  return createAnimation()
    .addElement(ionFabButton)
    .beforeAddWrite(() => {
      ionFabButton.style.transformOrigin = 'center right';
      ionFabButton.querySelector<HTMLElement>('ion-icon')?.style.setProperty('opacity', '0');
    })
    .afterAddWrite(() => {
      ionFabButton.style.pointerEvents = 'none';
    })
    .fromTo('opacity', '1', '0');
};

/**
 * 逆FABボタンアニメーションを作成
 */
const createReverseFabButtonAnimation = (ionFabButton: HTMLElement): Animation => {
  return createAnimation()
    .addElement(ionFabButton)
    .beforeAddWrite(() => {
      ionFabButton.style.transformOrigin = 'center right';
    })
    .afterAddWrite(() => {
      ionFabButton.style.pointerEvents = 'auto';
      ionFabButton.querySelector<HTMLElement>('ion-icon')?.style.setProperty('opacity', '1');
    })
    .fromTo('opacity', '0', '1');
};

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
  let elementSizes: ElementSizes | undefined;

  return (event: MouseEvent, type: TabBarSearchableType) => {
    if (type === TabBarSearchableType.Searchable) {
      elementSizes = searchableEvent(event, ionTabBar, ionFabButton, ionFooter);
    } else {
      defaultEvent(event, elementSizes!, ionTabBar, ionFabButton, ionFooter);
    }
  };
};

/**
 * 検索可能状態へのアニメーション処理
 */
const searchableEvent = (event: MouseEvent, ionTabBar: HTMLElement, ionFabButton: HTMLElement, ionFooter: HTMLElement): ElementSizes => {
  if (!(event.target as HTMLElement)?.closest('ion-fab-button')) {
    throw throwErrorByFailedToGet('ion-fab-button');
  }

  // DOM要素とサイズ情報を取得
  const references = getElementReferences(ionTabBar, ionFooter);
  const sizes = getElementSizes(ionTabBar, ionFabButton, references);

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
  return sizes;
};

/**
 * デフォルト状態への戻りアニメーション処理
 */
const defaultEvent = (
  event: MouseEvent,
  searchableElementSizes: ElementSizes,
  ionTabBar: HTMLElement,
  ionFabButton: HTMLElement,
  ionFooter: HTMLElement,
): void => {
  // DOM要素とサイズ情報を取得
  const references = getElementReferences(ionTabBar, ionFooter);
  const sizes = getElementSizes(ionTabBar, ionFabButton, references);

  // 各アニメーションを作成（逆の動作）
  const effectAnimation = createReverseEffectAnimation(references, sizes);
  const searchContainerAnimation = createReverseSearchContainerAnimation(references, sizes);
  const closeButtonsAnimation = createReverseCloseButtonsAnimation(references);
  const tabBarAnimation = createReverseTabBarAnimation(ionTabBar, references, sizes);
  const fabButtonAnimation = createReverseFabButtonAnimation(ionFabButton);

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
    .fromTo('opacity', '1', '0.8')
    .addAnimation([tabBarAnimation, fabButtonAnimation, searchContainerAnimation, effectAnimation, closeButtonsAnimation])
    .play();
};
