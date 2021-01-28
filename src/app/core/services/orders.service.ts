import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, Observable, of } from 'rxjs';
import { interval, never, timer } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { ConfirmedOrderData, mapToOrderData, OrderDto } from '../model/cart';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { OrderPages, OrderViewControllerService } from './order-view-controller.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  _orderToBeShown = new BehaviorSubject<number>(null);
  _trackingOrder = new BehaviorSubject<OrderDto>(null);

  constructor(private restApiService: RestApiService,
    private cartService: CartService,
    private authService: AuthService,
    private ordView: OrderViewControllerService) {
    this.setUpInterval();
  }

  setOrderToBeShown(orderId: number) {
    this._orderToBeShown.next(orderId);
  }

  get trackingOrder$(): Observable<OrderDto> {
    return this._trackingOrder.asObservable();
  }

  get orderToBeShown$(): Observable<number> {
    return this._orderToBeShown.asObservable();
  }

  makeOrder(): Observable<number> {
    return this.restApiService.post('api/customer/orders', {}).pipe(
      map(resp => resp.data.order_id),
      tap((ordId) => { this.cartService.addItem(null, false, true).subscribe(); this._orderToBeShown.next(ordId) }),
      // mergeMap((orderId: number) => this.cartService.addItem(null, false, true).pipe(map(() => orderId)))
    )
  }
  //COOKING, READY, COMPLETED
  setUpInterval() {
    this.authService.loggedUser$.pipe(
      // tap(user => console.log('got a user')),
      switchMap((user) => {
        if (user) return timer(0, 10000)
        else return NEVER
      }),
      switchMap(() => this.ordView.getCurrentPage() === OrderPages.OrderStatus ? NEVER : of(true))
    ).pipe(
      switchMap(() => this.restApiService.get('api/customer/orders').pipe(map((resp) => resp.data?.orders))),
      filter(d => d)
    )
      .subscribe((ords: Array<OrderDto>) => {
        let ord = ords.find((o) => o.status === 'NEW' || o.status === 'READY' || o.status === 'COOKING');
        if (ord && (ord.order_id !== this._trackingOrder.value?.order_id || ord.status !== this._trackingOrder.value?.status)) {
          this._trackingOrder.next(ord);
        }
      })
  }

  getOrderDetails(orderId): Observable<ConfirmedOrderData> {
    return this.restApiService.get('api/customer/orders?order_id=' + orderId).pipe(map((resp: any) => mapToOrderData(resp.data.orders[0])));
  }


  // checkForOrders
}
