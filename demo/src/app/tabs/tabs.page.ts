import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage implements OnInit {
  readonly #router = inject(Router);
  readonly #el = inject(ElementRef);
  ngOnInit() {
    this.#router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((params) => {
      const routePage = this.#el.nativeElement.querySelector('.ion-page:not(.ion-page-hidden)');
      if (routePage.querySelector('ion-back-button')) {
        routePage.classList.add('enable-back-button');
      }
      const tabBar = this.#el.nativeElement.querySelector('ion-tab-bar');
      if (!tabBar) {
        return;
      }
      console.log(params.urlAfterRedirects);

      if (['/main/settings'].includes(params.urlAfterRedirects)) {
        tabBar.classList.add('tab-bar-hide');
      } else if (tabBar) {
        tabBar.classList.remove('tab-bar-hide');
      }
    });
  }
}
