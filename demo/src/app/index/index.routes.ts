import { Routes } from '@angular/router';
import { IndexPageComponent } from './index-page.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'action-sheet',
    loadComponent: () => import('./pages/action-sheet/action-sheet.page').then((m) => m.ActionSheetPage),
  },
  {
    path: 'alert',
    loadComponent: () => import('./pages/alert/alert.page').then((m) => m.AlertPage),
  },
  {
    path: 'button',
    loadComponent: () => import('./pages/button/button.page').then((m) => m.ButtonPage),
  },
  {
    path: 'checkbox',
    loadComponent: () => import('./pages/checkbox/checkbox.page').then((m) => m.CheckboxPage),
  },
  {
    path: 'range',
    loadComponent: () => import('./pages/range/range.page').then((m) => m.RangePage),
  },
  {
    path: 'toast',
    loadComponent: () => import('./pages/toast/toast.page').then((m) => m.ToastPage),
  },
  {
    path: 'toggle',
    loadComponent: () => import('./pages/toggle/toggle.page').then((m) => m.TogglePage),
  },
  {
    path: 'segment',
    loadComponent: () => import('./pages/segment/segment.page').then((m) => m.SegmentPage),
  },
  {
    path: 'modal',
    loadComponent: () => import('./pages/modal/modal.page').then((m) => m.ModalPage),
  },
];
