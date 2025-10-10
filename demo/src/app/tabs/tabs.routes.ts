import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AlbumPage } from '../album/album-page.component';
import { SettingsPage } from '../settings/settings-page.component';
import { DocsPage } from '../docs/docs-page.component';

export const routes: Routes = [
  {
    path: 'main',
    component: TabsPage,
    children: [
      {
        path: 'index',
        loadChildren: () => import('../index/index.routes').then((m) => m.routes),
      },
      {
        path: 'docs',
        component: DocsPage,
      },
      {
        path: 'album',
        component: AlbumPage,
      },
      {
        path: 'settings',
        component: SettingsPage,
      },
      {
        path: '',
        redirectTo: '/main/index',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/main/index',
    pathMatch: 'full',
  },
];
