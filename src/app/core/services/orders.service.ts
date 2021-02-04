import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, NEVER, Observable, of, Subject } from 'rxjs';
import { interval, never, timer } from 'rxjs';
import { filter, map, mergeMap, pairwise, startWith, switchMap, take, tap } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { ConfirmedOrderData, mapToOrderData, OrderDto } from '../model/cart';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { OrderPages, OrderViewControllerService } from './order-view-controller.service';
<<<<<<< HEAD
//import { orders } from 'src/app/core/model/cart';
=======
import { orders } from 'src/app/core/model/cart';
>>>>>>> c68c2f1 (rebase - resolving conflicts in order-service.ts)
import { Pagination } from 'src/app/shared/classes/pagination';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  _orderToBeShown = new BehaviorSubject<number>(null);
  _trackingOrder = new BehaviorSubject<OrderDto>(null);
  _thankyouData = new BehaviorSubject<{ storeName: string }>(null);

  forcedCheckingSub = new Subject<true>();

  constructor(private restApiService: RestApiService,
    private cartService: CartService,
    private authService: AuthService,) {
    // this.setUpInterval();
  }

  setOrderToBeShown(orderId: number) {
    this._orderToBeShown.next(orderId);
  }

  setThankyouData(data: { storeName: string }) {
    this._thankyouData.next(data);
  }

  get thankyouData$(): Observable<{ storeName: string }> {
    return this._thankyouData.asObservable();
  }

  trackingOrder$ = this.authService.loggedUser$.pipe(
    // tap(user => console.log('got a user')),
    switchMap((user) => {
      if (user) return merge(this.forcedCheckingSub, timer(0, 60000));
      else return NEVER
    }),
    // switchMap(() => this.ordView.getCurrentPage() === OrderPages.OrderStatus ? NEVER : of(true)),
    switchMap(() => this.restApiService.get('api/customer/orders').pipe(
      map((resp) => {
        let ords: Array<OrderDto> = resp.data?.orders || [];
        return ords.find((o) => o.status === 'NEW' || o.status === 'READY' || o.status === 'COOKING' || o.status === 'DENY')
      })
    )),
    startWith<any>({}),
    pairwise(),
    switchMap(([old, curr]) => {
      if (curr?.order_id !== old?.order_id || curr?.status !== old?.status) {
        return of(curr);
      } return NEVER
    }),

  )


  // get orderHistoryorder

  get orderToBeShown$(): Observable<number> {
    return this._orderToBeShown.asObservable();
  }

  makeOrder(): Observable<number> {
    return this.restApiService.post('api/customer/orders', {}).pipe(
      map(resp => resp.data.order_id),
      tap((ordId) => { this.cartService.addItem(null, false, true).pipe(take(1)).subscribe(); this._orderToBeShown.next(ordId); }),
      // mergeMap((orderId: number) => this.cartService.addItem(null, false, true).pipe(map(() => orderId)))
    )
  }

  //COOKING, READY, COMPLETED
  setUpInterval() {
    this.authService.loggedUser$.pipe(
      // tap(user => console.log('got a user')),
      switchMap((user) => {
        if (user) return merge(this.forcedCheckingSub, timer(0, 60000));
        else return NEVER
      }),
      // switchMap(() => this.ordView.getCurrentPage() === OrderPages.OrderStatus ? NEVER : of(true)),
      switchMap(() => this.restApiService.get('api/customer/orders').pipe(map((resp) => resp.data?.orders || []))),
      switchMap((orders) => {
        let ord = orders.find((o) => o.status === 'NEW' || o.status === 'READY' || o.status === 'COOKING' || o.status === 'DENY');
        if (ord?.order_id !== this._trackingOrder.value?.order_id || ord?.status !== this._trackingOrder.value?.status) {
          return of(orders);
        } return NEVER
      })
    )
    // .subscribe((ords: Array<OrderDto>) => {
    //   let ord = ords.find((o) => o.status === 'NEW' || o.status === 'READY' || o.status === 'COOKING');
    //   if (ord?.order_id !== this._trackingOrder.value?.order_id || ord?.status !== this._trackingOrder.value?.status) {
    //     this._trackingOrder.next(ord);
    //   }
    // })
  }



  // setUpInterval() {
  //   this.authService.loggedUser$.pipe(
  //     // tap(user => console.log('got a user')),
  //     switchMap((user) => {
  //       if (user) return merge(this.forcedCheckingSub, timer(0, 60000));
  //       else return NEVER
  //     }),
  //     // switchMap(() => this.ordView.getCurrentPage() === OrderPages.OrderStatus ? NEVER : of(true)),
  //     switchMap(() => this.restApiService.get('api/customer/orders').pipe(map((resp) => resp.data?.orders || []))),
  //   ).subscribe((ords: Array<OrderDto>) => {
  //     let ord = ords.find((o) => o.status === 'NEW' || o.status === 'READY' || o.status === 'COOKING');
  //     if (ord?.order_id !== this._trackingOrder.value?.order_id || ord?.status !== this._trackingOrder.value?.status) {
  //       this._trackingOrder.next(ord);
  //     }
  //   })
  // }

  getOrderDetails(orderId): Observable<ConfirmedOrderData> {
    return this.restApiService.get('api/customer/orders?order_id=' + orderId).pipe(map((resp: any) => mapToOrderData(resp.data.orders[0])));
  }

  getAllOrder(page: number): Observable<Pagination<OrderDto>> {
    return this.restApiService.get('api/customer/orders/history?page=' + page);
  }

  markOrderComplete(ordId: number, orderStatus: string) {
    return this.restApiService.patch('api/customer/orders',
      {
        "order_id": ordId,
        "status": orderStatus
      });
  }


  // checkForOrders
}
