import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs, ViewDidEnter } from '@ionic/angular/standalone';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { registerTabBarEffect } from '../../../../src';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit, ViewDidEnter {
  readonly #router = inject(Router);
  readonly #el = inject(ElementRef);
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
    registerTabBarEffect();
  }
}
