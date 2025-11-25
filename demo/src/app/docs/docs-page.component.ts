import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  Platform,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-docs-page',
  templateUrl: './docs-page.component.html',
  styleUrls: ['./docs-page.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonIcon,
    IonButton,
    IonButtons,
    IonList,
    IonItem,
    IonSegment,
    IonLabel,
    IonSegmentButton,
    IonListHeader,
    IonLabel,
    IonNote,
    IonItemGroup,
  ],
})
export class DocsPage {
  readonly platform = inject(Platform);
}
