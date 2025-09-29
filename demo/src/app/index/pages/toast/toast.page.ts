import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
})
export class ToastPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
