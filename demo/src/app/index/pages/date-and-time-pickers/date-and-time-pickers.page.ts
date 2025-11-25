import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonModal,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-date-and-time-pickers',
  templateUrl: './date-and-time-pickers.page.html',
  styleUrls: ['./date-and-time-pickers.page.scss'],
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
    IonDatetime,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
    IonModal,
    IonDatetimeButton,
  ],
})
export class DateAndTimePickersPage implements OnInit {
  readonly fixedDateTime = '1986-04-20T12:00:00';
  constructor() {}

  ngOnInit() {}
}
