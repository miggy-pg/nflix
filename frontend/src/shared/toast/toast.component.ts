import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  imports: [CommonModule],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          display: 'none',
          opacity: 100,
        })
      ),
      state(
        'open',
        style({
          display: 'block',
          opacity: 1,
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastService) {
    this.toastService.open.subscribe((data) => {
      if (data.show) {
        setTimeout(() => this.toastService.hide(), 3000);
      }
    });
  }

  ngOnInit() {}
}
