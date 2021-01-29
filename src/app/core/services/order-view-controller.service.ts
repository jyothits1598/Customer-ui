import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export enum OrderPages {
  Cart = 1,
  CartSummary,
  OrderStatus,
  AddPaymentOptions,
  Thankyou
}

@Injectable({
  providedIn: 'root'
})
export class OrderViewControllerService {
  _currentOrderPage = new BehaviorSubject<OrderPages>(null);
  
  constructor() { }

  showPage(page: OrderPages): void {
    this._currentOrderPage.next(page);
  }

  getCurrentPage$(): Observable<OrderPages> {
    return this._currentOrderPage.asObservable();
  }

  getCurrentPage(): OrderPages {
    return this._currentOrderPage.value;
  }


}
