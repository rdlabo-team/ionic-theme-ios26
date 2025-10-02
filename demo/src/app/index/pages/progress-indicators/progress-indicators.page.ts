import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonLoading,
  IonPopover,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

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
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonButton,
    IonPopover,
    IonLoading,
  ],
})
export class ProgressIndicatorsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
