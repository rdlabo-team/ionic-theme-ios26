import { ElementReferences, ElementSizes } from './interfaces';

export const throwErrorByFailedToGet = (selector: string): Error => {
  return new Error('Function expect click Element is inner `' + selector + '`');
};

export const getElement = (docs: HTMLElement, selector: string): HTMLElement => {
  const el = docs.querySelector<HTMLElement>(selector);
  if (!el) {
    throw throwErrorByFailedToGet(selector);
  }
  return el;
};

export const getElementReferences = (ionTabBar: HTMLElement, ionFooter: HTMLElement): ElementReferences => {
  const searchContainer = getElement(ionFooter, 'ion-searchbar .searchbar-input-container');
  const closeButtons = getElement(ionFooter, 'ion-buttons[slot=start]');
  const selectedTabButton = ionTabBar.querySelector<HTMLElement>('ion-tab-button.tab-selected');
  const selectedTabButtonIcon = selectedTabButton?.querySelector('ion-icon') || null;
  const closeButtonIcon = closeButtons.querySelector('ion-icon');

  return {
    searchContainer,
    closeButtons,
    selectedTabButton,
    selectedTabButtonIcon,
    closeButtonIcon,
  };
};

/**
 * 各要素のサイズ情報を取得
 */
export const getElementSizes = (ionTabBar: HTMLElement, ionFabButton: HTMLElement, references: ElementReferences): ElementSizes => {
  const tabBarRect = ionTabBar.getBoundingClientRect();
  const fabButtonRect = ionFabButton.getBoundingClientRect();
  const closeButtonRect = references.closeButtons.getBoundingClientRect();
  const searchContainerRect = references.searchContainer.getBoundingClientRect();
  const selectedTabButtonIconRect = references.selectedTabButtonIcon!.getBoundingClientRect();

  return {
    tabBar: { width: tabBarRect.width, height: tabBarRect.height },
    closeButton: { width: closeButtonRect.width, height: closeButtonRect.height },
    fabButton: { width: fabButtonRect.width, height: fabButtonRect.height },
    searchContainer: { width: searchContainerRect.width, height: searchContainerRect.height },
    selectedTabButtonIcon: {
      width: selectedTabButtonIconRect.width,
      height: selectedTabButtonIconRect.height,
      top: selectedTabButtonIconRect.top,
      left: selectedTabButtonIconRect.left,
    },
  };
};
