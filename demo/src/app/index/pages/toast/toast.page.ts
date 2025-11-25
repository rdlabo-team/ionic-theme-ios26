import { Component, effect, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { toastTypes } from '../../../overlay-types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonBackButton,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonButtons,
  ],
})
export class ToastPage implements OnInit {
  readonly #route = inject(ActivatedRoute);
  readonly #params = toSignal(this.#route.queryParams);
  readonly overlayCtrl = inject(ToastController);

  constructor() {
    effect(async () => {
      if (this.#params()?.['type']) {
        await this.present(this.#params()?.['type']);
      }
    });
  }

  ngOnInit() {}

  async present(type: (typeof toastTypes)[number]) {
    const toastDefault = {
      message: 'Hello World!',
      buttons: ['Close'],
    };
    const applyConfig = ((type) => {
      if (type === 'anchor') {
        return {
          ...toastDefault,
          positionAnchor: 'tab-bar-bottom',
          position: 'bottom' as 'top' | 'middle' | 'bottom',
        };
      }
      return {
        ...toastDefault,
        position: type as 'top' | 'middle' | 'bottom',
      };
    })(type);
    const actionSheet = await this.overlayCtrl.create(applyConfig);
    await actionSheet.present();
  }
}
