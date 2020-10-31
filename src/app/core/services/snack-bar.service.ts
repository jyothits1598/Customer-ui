import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SnackBar, SnackBarType } from '../model/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  snackbars = new Subject<SnackBar>();
  snackbars$ = this.snackbars.asObservable();
  constructor() { }

  success(message: string) {
    this.snackbars.next({
      type: SnackBarType.success,
      message: message
    })
  }

  error(message: string) {
    this.snackbars.next({
      type: SnackBarType.error,
      message: message
    })
  }
}
