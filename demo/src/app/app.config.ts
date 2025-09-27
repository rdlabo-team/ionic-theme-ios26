import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as allIcons from 'ionicons/icons';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

addIcons(allIcons);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideIonicAngular({ useSetInputAPI: true, mode: 'ios', backButtonText: '' }),
  ],
};
