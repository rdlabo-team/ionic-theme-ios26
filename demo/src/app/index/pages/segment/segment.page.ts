import { Component, ElementRef, inject, OnInit } from '@angular/core';
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
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  ViewDidEnter,
  ViewDidLeave,
} from '@ionic/angular/standalone';
import { registeredEffect, registerSegmentEffect } from '../../../../../../src';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
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
    IonSegment,
    IonSegmentButton,
    IonButtons,
    IonButton,
  ],
})
export class SegmentPage implements OnInit, ViewDidEnter, ViewDidLeave {
  readonly #el = inject(ElementRef);
  readonly registeredGestures: registeredEffect[] = [];
  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.#el.nativeElement.querySelectorAll('ion-segment').forEach((item: HTMLElement) => {
      const registerGesture = registerSegmentEffect(item);
      if (registerGesture) {
        this.registeredGestures.push(registerGesture);
      }
    });
  }

  ionViewDidLeave() {
    this.registeredGestures.forEach((gesture) => gesture.destroy());
  }
}
