import { createAnimation } from '@ionic/core';
import { getElement, throwErrorByFailedToGet } from './utils';

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
  const closeButton = getElement(ionFooter, 'ion-buttons[slot=start] ion-button');

  const { width: tabBarWidth, height: tabBarHeight } = ionTabBar.getBoundingClientRect();
  const { width: closeButtonWidth, height: closeButtonHeight } = closeButton.getBoundingClientRect();
  const { width: fabButtonWidth, height: fabButtonHeight } = ionFabButton.getBoundingClientRect();
  const { width: searchbarWidth, height: searchbarHeight } = searchContainer.getBoundingClientRect();

  const searchContainerAnimation = createAnimation()
    .addElement(searchContainer)
    .beforeAddWrite(() => {
      searchContainer.style.transformOrigin = 'right center';
      searchContainer.style.pointerEvents = 'auto';
    })
    .fromTo('opacity', `0`, `1`)
    .fromTo('transform', `scale(${fabButtonWidth / searchbarWidth}, ${fabButtonHeight / searchbarHeight})`, `scale(1)`);

  const tabBarAnimation = createAnimation()
    .addElement(ionTabBar)
    .beforeAddWrite(() => {
      ionTabBar.style.transformOrigin = 'left center';
      const selected = ionTabBar.querySelector<HTMLElement>('ion-tab-button.tab-selected');
      ionTabBar.querySelectorAll<HTMLElement>('ion-tab-button').forEach((element: HTMLElement) => (element.style.opacity = '0'));
      if (selected) {
        selected.classList.add('ios26-tab-selected');
        selected.classList.remove('tab-selected');
        const iconName = selected.querySelector('ion-icon')!.getAttribute('name');
        if (iconName) {
          closeButton.querySelector<HTMLElement>('ion-icon')?.setAttribute('name', iconName);
        }
      }
    })
    .afterAddWrite(() => {
      const selected = ionTabBar.querySelector<HTMLElement>('ion-tab-button.ios26-tab-selected');
      if (selected) {
        selected.classList.add('tab-selected');
        selected.classList.remove('ios26-tab-selected');
      }
    })
    .fromTo('transform', `scale(1)`, `scale(${closeButtonWidth / tabBarWidth}, ${closeButtonHeight / tabBarHeight})`)
    .fromTo('opacity', '1', '0');

  const fabButtonAnimation = createAnimation()
    .addElement(ionFabButton)
    .beforeAddWrite(() => {
      ionFabButton.style.transformOrigin = 'right center';
      ionFabButton.querySelector<HTMLElement>('ion-icon')?.style.setProperty('opacity', '0');
    })
    .fromTo('transform', `translateX(0) scale(1)`, `translateX(-16px) scale(1, ${searchbarHeight / fabButtonHeight})`)
    .fromTo('opacity', '1', '0');

  baseAnimation
    .duration(600)
    .easing('cubic-bezier(0, 1, 0.22, 1)')
    .addElement(ionFooter)
    .beforeAddWrite(() => (searchContainer.style.pointerEvents = 'auto'))
    .fromTo('opacity', `0`, `1`)
    .addAnimation([tabBarAnimation, fabButtonAnimation, searchContainerAnimation])
    .play();
};

const defaultEvent = (event: MouseEvent, ionTabBar: HTMLElement, ionFabButton: HTMLElement, ionFooter: HTMLElement): void => {};
