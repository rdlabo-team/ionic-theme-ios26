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
];
