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
import { ActionSheetController } from '@ionic/angular';
import { actionSheetUtil } from '../action-sheet/action-sheet.util';
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

  async present(type: 'all' | 'button-only' | 'no-cancel' | 'force-dark-mode') {
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
      }
      return alertUtil();
    })(type);

    const actionSheet = await this.overlayCtrl.create(applyConfig);
    await actionSheet.present();
  }
}
