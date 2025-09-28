import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonNote,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { actionSheetUtil } from './action-sheet.util';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonIcon,
    IonText,
    IonNote,
  ],
})
export class ActionSheetPage implements OnInit {
  readonly overlayCtrl = inject(ActionSheetController);

  ngOnInit() {}

  async present(type: 'all' | 'button-only' | 'no-cancel' | 'force-dark-mode') {
    const applyConfig = ((type) => {
      if (type === 'button-only') {
        return {
          ...actionSheetUtil(),
          header: undefined,
          subHeader: undefined,
        };
      } else if (type === 'no-cancel') {
        return {
          ...actionSheetUtil(),
          buttons: actionSheetUtil().buttons.filter((button) => button.role !== 'cancel'),
        };
      } else if (type === 'force-dark-mode') {
        return {
          ...actionSheetUtil(),
          cssClass: 'ion-palette-dark',
        };
      }
      return actionSheetUtil();
    })(type);

    const actionSheet = await this.overlayCtrl.create(applyConfig);
    await actionSheet.present();
  }
}
