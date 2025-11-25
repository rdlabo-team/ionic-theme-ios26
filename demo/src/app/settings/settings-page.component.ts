import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonSearchbar,
  IonTitle,
  IonToggle,
  IonToolbar,
  Platform,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonButtons,
    IonFooter,
    IonSearchbar,
    IonBackButton,
    IonAvatar,
    IonImg,
    IonNote,
    IonItemGroup,
    IonToggle,
  ],
})
export class SettingsPage {
  readonly platform = inject(Platform);
}
