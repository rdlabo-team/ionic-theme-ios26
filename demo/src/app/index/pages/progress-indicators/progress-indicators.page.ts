import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonLoading,
  IonText,
  IonTitle,
  IonToolbar,
  LoadingController,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { alertTypes, loadingTypes } from '../../../overlay-types';
import { alertUtil } from '../alert/alert.util';

@Component({
  selector: 'app-progress-indicators',
  templateUrl: './progress-indicators.page.html',
  styleUrls: ['./progress-indicators.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonButton,
    IonLoading,
  ],
})
export class ProgressIndicatorsPage implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #params = toSignal(this.#route.queryParams);
  readonly overlayCtrl = inject(LoadingController);

  constructor() {
    effect(async () => {
      if (this.#params()?.['type']) {
        await this.present(this.#params()?.['type']);
      }
    });
  }

  ngOnInit() {}

  async present(type: (typeof loadingTypes)[number]) {
    const actionSheet = await this.overlayCtrl.create({
      message: type === 'message' ? 'Dismissing after 10 seconds...' : undefined,
      duration: 10000,
    });
    await actionSheet.present();
  }
}
