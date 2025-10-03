import { Component, inject, OnInit } from '@angular/core';
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
  IonNote,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { alertUtil } from './alert.util';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
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
    IonNote,
    IonText,
  ],
})
export class AlertPage implements OnInit {
  readonly overlayCtrl = inject(AlertController);

  ngOnInit() {}

  async present(type: 'all' | 'button-only' | 'no-cancel' | 'force-dark-mode' | 'remove-app') {
    const applyConfig = ((type) => {
      if (type === 'button-only') {
        return {
          ...alertUtil(),
          header: undefined,
          subHeader: undefined,
        };
      } else if (type === 'no-cancel') {
        return {
          ...alertUtil(),
          buttons: alertUtil().buttons.filter((button) => button.role !== 'cancel'),
        };
      } else if (type === 'force-dark-mode') {
        return {
          ...alertUtil(),
          cssClass: 'ion-palette-dark',
        };
      } else if (type === 'remove-app') {
        return {
          ...alertUtil(),
          header: 'Remove "odss"?',
          subHeader: undefined,
          message: 'Removing from Home Screen will keep the app in your App Library',
          buttons: [
            ...alertUtil().buttons,
            {
              text: 'Remove from Home Screen',
              role: 'confirm',
              handler: () => {
                console.log('Alert confirmed');
              },
            },
          ],
        };
      }
      return alertUtil();
    })(type);

    const actionSheet = await this.overlayCtrl.create(applyConfig);
    await actionSheet.present();
  }
}
