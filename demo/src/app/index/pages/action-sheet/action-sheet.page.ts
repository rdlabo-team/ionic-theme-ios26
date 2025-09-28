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
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActionSheetController } from '@ionic/angular';
import { sheetConfig } from './action-sheet.util';

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
  ],
})
export class ActionSheetPage implements OnInit {
  readonly actionSheetCtrl = inject(ActionSheetController);

  ngOnInit() {}

  async presentActionSheet(type: 'all' | 'button-only' | 'no-cancel') {
    const applyConfig = ((type) => {
      if (type === 'button-only') {
        return {
          ...sheetConfig(),
          header: undefined,
          subHeader: undefined,
        };
      } else if (type === 'no-cancel') {
        return {
          ...sheetConfig(),
          buttons: sheetConfig().buttons.filter((button) => button.role !== 'cancel'),
        };
      }
      return sheetConfig();
    })(type);

    const actionSheet = await this.actionSheetCtrl.create(applyConfig);
    await actionSheet.present();
  }
}
