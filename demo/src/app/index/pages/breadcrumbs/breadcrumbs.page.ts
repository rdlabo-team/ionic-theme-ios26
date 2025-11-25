import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonBreadcrumb,
  IonBreadcrumbs,
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

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.page.html',
  styleUrls: ['./breadcrumbs.page.scss'],
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
    IonBreadcrumbs,
    IonBreadcrumb,
    IonButtons,
  ],
})
export class BreadcrumbsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
