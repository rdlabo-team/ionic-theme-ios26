export enum TabBarSearchableType {
  Searchable = 'searchable',
  Default = 'default',
}

export type TabBarSearchableFunction = (event: MouseEvent, type: TabBarSearchableType) => void;

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
  selectedTabButton: HTMLElement | null;
  selectedTabButtonIcon: HTMLElement | null;
  closeButtonIcon: HTMLElement | null;
}
