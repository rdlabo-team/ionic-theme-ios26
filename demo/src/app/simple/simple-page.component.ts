import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.scss'],
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePageComponent {
  readonly components = [
    {
      name: 'Accordion',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Action Sheet',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Alert',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Badge',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Breadcrumbs',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Button',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Card',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Checkbox',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Chip',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Content',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Date & Time Pickers',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Floating Action Button',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Grid',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Icons',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Infinite Scroll',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Inputs',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Item List',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Media',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Menu',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Modal',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Navigate',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Popover',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Progress Indicators',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Radio',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Range',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Refresher',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Reorder',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Routing',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Searchbar',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Segment',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Select',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Tabs',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Toast',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Toggle',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Toolbar',
      detail: false,
      end: 'WIP',
    },
    {
      name: 'Typography',
      detail: false,
      end: 'WIP',
    },
  ];
}
