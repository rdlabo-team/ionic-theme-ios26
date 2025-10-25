import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import * as allIcons from 'ionicons/icons';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { popoverEnterAnimation, popoverLeaveAnimation } from '../../../src';

addIcons(allIcons);

// Disable animations during E2E tests for consistent screenshots
const isE2ETesting = typeof window !== 'undefined' && (window as any).IONIC_E2E_TESTING === true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideIonicAngular({
      useSetInputAPI: true,
      mode: 'ios',
      backButtonText: '',
      animated: !isE2ETesting,
      popoverEnter: popoverEnterAnimation,
      popoverLeave: popoverLeaveAnimation,
    }),
  ],
};
