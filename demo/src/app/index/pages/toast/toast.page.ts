import { Component, ElementRef, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonBackButton,
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
  ModalController,
} from '@ionic/angular/standalone';
import { alertUtil } from '../alert/alert.util';
import { ToastController } from '@ionic/angular';

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
    CommonModule,
    FormsModule,
    IonBackButton,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
  ],
})
export class ToastPage implements OnInit {
  readonly overlayCtrl = inject(ToastController);

  ngOnInit() {}

  async present(type: 'top' | 'middle' | 'bottom' | 'anchor') {
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
