export enum TabBarSearchableType {
  Enter = 'enter',
  Leave = 'leave',
}

export type TabBarSearchableFunction = (event: Event, type: TabBarSearchableType) => Promise<void>;

export interface SearchableEventCache {
  elementSizes: ElementSizes;
  colorSelected: string;
}

// DOM要素とサイズ情報の型定義
export interface ElementSizes {
  tabBar: { width: number; height: number };
  closeButton: { width: number; height: number };
  fabButton: { width: number; height: number };
  searchContainer: { width: number; height: number };
  selectedTabButtonIcon: { width: number; height: number; top: number; left: number };
}

export interface ElementReferences {
  searchContainer: HTMLElement;
  closeButtons: HTMLElement;
  selectedTabButton: HTMLElement;
  selectedTabButtonIcon: HTMLElement;
  closeButtonIcon: HTMLElement;
}
