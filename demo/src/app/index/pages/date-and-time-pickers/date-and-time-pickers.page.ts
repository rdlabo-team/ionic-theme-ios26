import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule,
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
  constructor() {}

  ngOnInit() {}
}
