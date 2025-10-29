import { createAnimation, Animation } from '@ionic/core';
import { getElementReferences, getElementSizes, throwErrorByFailedToGet } from './utils';
import { cloneElement } from '../utils';
import { ElementReferences, ElementSizes, TabBarSearchableFunction, TabBarSearchableType } from './interfaces';
export * from './interfaces';

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

  return (event: MouseEvent, type: TabBarSearchableType) => {
    return type === TabBarSearchableType.Searchable
      ? searchableEvent(event, ionTabBar, ionFabButton, ionFooter)
      : defaultEvent(event, ionTabBar, ionFabButton, ionFooter);
  };
};

/**
 * 検索可能状態へのアニメーション処理
 */
const searchableEvent = (event: MouseEvent, ionTabBar: HTMLElement, ionFabButton: HTMLElement, ionFooter: HTMLElement): void => {
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
};

const defaultEvent = (event: MouseEvent, ionTabBar: HTMLElement, ionFabButton: HTMLElement, ionFooter: HTMLElement): void => {
  // TODO: デフォルト状態への戻りアニメーションを実装
};
