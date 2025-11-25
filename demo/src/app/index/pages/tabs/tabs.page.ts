import { Component, OnInit } from '@angular/core';

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
  IonTabBar,
  IonTabButton,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonBackButton,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonTabBar,
    IonTabButton,
    IonButtons,
  ],
})
export class TabsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
