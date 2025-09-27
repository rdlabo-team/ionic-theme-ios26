import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { SimplePageComponent } from '../simple/simple-page.component';
import { AlbumPage } from '../album/album-page.component';
import { SettingsPage } from '../settings/settings-page.component';
import { HealthPage } from '../health/health-page.component';

export const routes: Routes = [
  {
    path: 'main',
    component: TabsPage,
    children: [
      {
        path: 'simple',
        component: SimplePageComponent,
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
        path: 'health',
        component: HealthPage,
      },
      {
        path: '',
        redirectTo: '/main/photo-editor',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/main/simple',
    pathMatch: 'full',
  },
];
