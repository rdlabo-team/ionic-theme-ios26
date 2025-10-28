import { createAnimation } from '@ionic/core';
import { getElement, throwErrorByFailedToGet } from './utils';
import { cloneElement } from '../utils';

/**
  <ion-footer [translucent]="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <!-- ion-icon does not need `name` attribute. -->
        <ion-button fill="default"><ion-icon slot="icon-only"></ion-icon></ion-button>
      </ion-buttons>
      <!-- User set `ionChange` or other events. -->
      <ion-searchbar (ionChange)="example($event)"></ion-searchbar>
    </ion-toolbar>
  </ion-footer>
 *
 * @param ionTabBar
 * @param ionFabButton Set the return function of this function as the click event.
 * @param ionFooter
 */
export enum TabBarSearchableType {
  Searchable = 'searchable',
  Default = 'default',
}
export type TabBarSearchableFunction = (event: MouseEvent, type: TabBarSearchableType) => void;
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

const searchableEvent = (event: MouseEvent, ionTabBar: HTMLElement, ionFabButton: HTMLElement, ionFooter: HTMLElement): void => {
  if (!(event.target as HTMLElement)?.closest('ion-fab-button')) {
    throw throwErrorByFailedToGet('ion-fab-button');
  }

  const baseAnimation = createAnimation().addElement(ionFooter.querySelector('ion-toolbar')!).fromTo('opacity', '0', '1');

  const searchContainer = getElement(ionFooter, 'ion-searchbar .searchbar-input-container');
  const closeButtons = getElement(ionFooter, 'ion-buttons[slot=start]');

  const { width: tabBarWidth, height: tabBarHeight } = ionTabBar.getBoundingClientRect();
  const { width: closeButtonWidth, height: closeButtonHeight } = closeButtons.getBoundingClientRect();
  const { width: fabButtonWidth, height: fabButtonHeight } = ionFabButton.getBoundingClientRect();
  const { width: searchContainerWidth, height: searchContainerHeight } = searchContainer.getBoundingClientRect();
  const selectedTabButton = ionTabBar.querySelector<HTMLElement>('ion-tab-button.tab-selected');

  const effectElement = cloneElement('ion-icon');
  const closeButtonRect = closeButtons.querySelector('ion-icon')?.getBoundingClientRect();
  const selectedTabButtonIcon = selectedTabButton?.querySelector('ion-icon');
  const iconName = selectedTabButtonIcon?.getAttribute('name');
  const selectedTabButtonIconRect = selectedTabButtonIcon?.getBoundingClientRect();

  const effectAnimation = createAnimation()
    .addElement(effectElement)
    .beforeAddWrite(() => {
      effectElement.style.display = 'inline-block';
      closeButtons.querySelector('ion-icon')!.style.opacity = '0';
      if (iconName) {
        effectElement.setAttribute('name', iconName);
        effectElement.style.width = `${closeButtonRect!.width}px`;
        effectElement.style.height = `${closeButtonRect!.height}px`;
      }
    })
    .afterAddWrite(() => {
      effectElement.style.display = 'none';
      closeButtons.querySelector('ion-icon')!.style.opacity = '1';
    })
    .fromTo(
      'transform',
      `translate3d(${selectedTabButtonIconRect!.left}px, ${selectedTabButtonIconRect!.top}px, 0)`,
      `translate3d(${closeButtonRect!.left}px, ${closeButtonRect!.top}px, 0)`,
    );

  const searchContainerAnimation = createAnimation()
    .addElement(searchContainer)
    .beforeAddWrite(() => (searchContainer.style.transformOrigin = 'right center'))
    .fromTo('transform', `scale(${fabButtonWidth / searchContainerWidth}, ${fabButtonHeight / searchContainerHeight})`, `scale(1)`)
    .fromTo('opacity', '0.2', '1');

  const closeButtonsAnimation = createAnimation()
    .delay(240)
    .addElement(closeButtons)
    .beforeAddWrite(() => (closeButtons.style.transformOrigin = 'left center'))
    .afterClearStyles(['transform', 'transform-origin'])
    .fromTo('transform', `scale(1.5, 1)`, `scale(1)`);

  const tabBarAnimation = createAnimation()
    .addElement(ionTabBar)
    .beforeAddWrite(() => {
      ionTabBar.querySelectorAll<HTMLElement>('ion-tab-button').forEach((element: HTMLElement) => {
        element.style.transition = 'opacity 140ms ease';
        element.style.opacity = '0';
      });
      if (selectedTabButton) {
        selectedTabButton.classList.add('ios26-tab-selected');
        selectedTabButton.classList.remove('tab-selected');
        if (iconName) {
          closeButtons.querySelector<HTMLElement>('ion-icon')?.setAttribute('name', iconName);
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
    .fromTo('transform', `scale(1)`, `scale(${closeButtonWidth / tabBarWidth}, ${closeButtonHeight / tabBarHeight})`)
    .fromTo('opacity', '1', '0');

  const fabButtonAnimation = createAnimation()
    .addElement(ionFabButton)
    .beforeAddWrite(() => {
      ionFabButton.style.transformOrigin = 'center right';
      ionFabButton.querySelector<HTMLElement>('ion-icon')?.style.setProperty('opacity', '0');
    })
    .afterAddWrite(() => {
      ionFabButton.style.pointerEvents = 'none';
    })
    .fromTo('opacity', '1', '0');

  baseAnimation
    .delay(140)
    .duration(600)
    .easing('cubic-bezier(0, 1, 0.22, 1)')
    .addElement(ionFooter)
    .afterAddWrite(() => (ionFooter.style.pointerEvents = 'auto'))
    .fromTo('opacity', `0.8`, `1`)
    .addAnimation([tabBarAnimation, fabButtonAnimation, searchContainerAnimation, effectAnimation, closeButtonsAnimation])
    .play();
};

const defaultEvent = (event: MouseEvent, ionTabBar: HTMLElement, ionFabButton: HTMLElement, ionFooter: HTMLElement): void => {};
