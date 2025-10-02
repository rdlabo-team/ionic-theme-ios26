import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPopover,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonAvatar,
    IonBackButton,
    IonChip,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonText,
    IonButton,
    IonPopover,
  ],
})
export class PopoverPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
