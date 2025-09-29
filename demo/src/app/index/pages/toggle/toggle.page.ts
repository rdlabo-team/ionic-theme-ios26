import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
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
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.page.html',
  styleUrls: ['./toggle.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonListHeader,
    IonNote,
    IonText,
    IonToggle,
  ],
})
export class TogglePage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
