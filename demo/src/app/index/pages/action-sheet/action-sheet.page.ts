import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActionSheetController,
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

  async present(type: 'all' | 'button-only' | 'no-cancel') {
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
      }
      return actionSheetUtil();
    })(type);
    const actionSheet = await this.overlayCtrl.create(applyConfig);
    console.log(applyConfig);
    await actionSheet.present().then(() => console.log(type));
  }
}
