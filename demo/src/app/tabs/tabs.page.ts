import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, ViewDidEnter, ViewDidLeave, Gesture } from '@ionic/angular/standalone';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

// import { registerTabBarEffect } from '@rdlabo/ionic-theme-ios26';
import { registerTabBarEffect } from '../../../../src';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit, ViewDidEnter, ViewDidLeave {
  readonly #router = inject(Router);
  readonly #el = inject(ElementRef);
  readonly registeredGestures: Gesture[] = [];
  ngOnInit() {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((params) => {
      const tabBar = this.#el.nativeElement.querySelector('ion-tab-bar');
      if (!tabBar) {
        return;
      }
      if (['/main/settings'].includes(params.urlAfterRedirects)) {
        tabBar.classList.add('tab-bar-hidden');
      } else if (tabBar) {
        tabBar.classList.remove('tab-bar-hidden');
      }
    });
  }

  ionViewDidEnter() {
    const registerGesture = registerTabBarEffect(document.querySelector<HTMLElement>('ion-tab-bar')!);
    if (registerGesture) {
      this.registeredGestures.push(registerGesture);
    }
  }

  ionViewDidLeave() {
    this.registeredGestures.forEach((gesture) => gesture.destroy());
  }
}
