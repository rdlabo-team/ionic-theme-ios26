import { Component, effect, ElementRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  ViewDidEnter,
} from '@ionic/angular/standalone';
import { selectTypes } from '../../../overlay-types';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-select',
  templateUrl: './select.page.html',
  styleUrls: ['./select.page.scss'],
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
    IonSelect,
    IonSelectOption,
    IonListHeader,
  ],
})
export class SelectPage implements OnInit, ViewDidEnter {
  readonly interfaces = selectTypes as ('action-sheet' | 'popover' | 'alert' | 'modal')[];

  readonly #route = inject(ActivatedRoute);
  readonly #params = toSignal(this.#route.queryParams);
  readonly el = inject(ElementRef);

  constructor() {}

  ngOnInit() {}

  async ionViewDidEnter() {
    if (this.#params()?.['type']) {
      await this.present(this.#params()?.['type']);
    }
  }

  present(type: (typeof selectTypes)[number]) {
    const ionSelect = this.el.nativeElement.querySelector('.select-' + type);
    ionSelect.open();
  }
}
