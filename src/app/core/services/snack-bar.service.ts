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

  Success(type: SnackBarType, message: string) {
    this.snackbars.next({
      type: type,
      message: message
    })
  }
  Error(type: SnackBarType, message: string) {
    this.snackbars.next({
      type: type,
      message: message
    })
  }
}
