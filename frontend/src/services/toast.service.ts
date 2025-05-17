import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastData {
  title: string;
  content: string;
  show?: boolean;
  type?: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  data: ToastData = {
    title: '',
    content: '',
    type: 'success',
    show: false,
  };

  open = new Subject<ToastData>();

  initiate(data: ToastData) {
    this.data = {
      ...data,
      type: data.type ?? 'error',
    };
    this.open.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
