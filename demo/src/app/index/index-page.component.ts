import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
  IonToolbar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPageComponent {
  readonly components = signal<IComponent[]>([
    { name: 'accordion', enable: false },
    { name: 'action-sheet', enable: true },
    { name: 'alert', enable: true },
    { name: 'badge', enable: false },
    { name: 'breadcrumbs', enable: false },
    { name: 'button', enable: false },
    { name: 'card', enable: false },
    { name: 'checkbox', enable: true },
    { name: 'chip', enable: false },
    { name: 'content', enable: false },
    { name: 'date-and-time-pickers', enable: false },
    { name: 'floating-action-button', enable: false },
    { name: 'grid', enable: false },
    { name: 'icons', enable: false },
    { name: 'infinite-scroll', enable: false },
    { name: 'inputs', enable: false },
    { name: 'item-list', enable: false },
    { name: 'media', enable: false },
    { name: 'menu', enable: false },
    { name: 'modal', enable: false },
    { name: 'navigate', enable: false },
    { name: 'popover', enable: false },
    { name: 'progress-indicators', enable: false },
    { name: 'radio', enable: false },
    { name: 'range', enable: false },
    { name: 'refresher', enable: false },
    { name: 'reorder', enable: false },
    { name: 'routing', enable: false },
    { name: 'searchbar', enable: false },
    { name: 'segment', enable: false },
    { name: 'select', enable: false },
    { name: 'tabs', enable: false },
    { name: 'toast', enable: false },
    { name: 'toggle', enable: false },
    { name: 'toolbar', enable: false },
    { name: 'typography', enable: false },
  ]);
  readonly enableComponents = computed(() => this.components().filter((c) => c.enable));
  readonly disableComponents = computed(() => this.components().filter((c) => !c.enable));

  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  async navigateComponent(item: IComponent) {
    if (!item.enable) {
      return;
    }
    await this.#router.navigate([item.name], { relativeTo: this.#route });
  }
}
