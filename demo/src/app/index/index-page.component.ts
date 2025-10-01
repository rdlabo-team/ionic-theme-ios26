import { ChangeDetectionStrategy, Component, computed, DOCUMENT, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ToggleCustomEvent } from '@ionic/angular';

interface IComponent {
  name: string;
  enable: boolean;
}

@Component({
  selector: 'index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonItemGroup,
    IonText,
    IonNote,
    IonToggle,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPageComponent {
  readonly components = signal<IComponent[]>([
    { name: 'accordion', enable: false },
    { name: 'action-sheet', enable: true },
    { name: 'alert', enable: true },
    { name: 'breadcrumbs', enable: true },
    { name: 'button', enable: true },
    { name: 'card', enable: true },
    { name: 'checkbox', enable: true },
    { name: 'chip', enable: true },
    { name: 'date-and-time-pickers', enable: false },
    { name: 'floating-action-button', enable: false },
    { name: 'inputs', enable: false },
    { name: 'item-list', enable: false },
    { name: 'menu', enable: false },
    { name: 'modal', enable: true },
    { name: 'popover', enable: false },
    { name: 'progress-indicators', enable: false },
    { name: 'radio', enable: false },
    { name: 'range', enable: true },
    { name: 'reorder', enable: false },
    { name: 'searchbar', enable: true },
    { name: 'segment', enable: true },
    { name: 'select', enable: false },
    { name: 'tabs', enable: false },
    { name: 'toast', enable: true },
    { name: 'toggle', enable: true },
    { name: 'toolbar', enable: false },
  ]);
  readonly enableComponents = computed(() => this.components().filter((c) => c.enable));
  readonly disableComponents = computed(() => this.components().filter((c) => !c.enable));

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #document = inject(DOCUMENT);

  async navigateComponent(item: IComponent) {
    if (!item.enable) {
      return;
    }
    await this.#router.navigate([item.name], { relativeTo: this.#route });
  }

  changeColorMode(event: ToggleCustomEvent) {
    this.#document.documentElement.classList.toggle('ion-palette-dark', event.detail.checked);
  }
}
