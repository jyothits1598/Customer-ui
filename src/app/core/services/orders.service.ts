import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, merge, NEVER, Observable, of, Subject } from 'rxjs';
import { interval, never, timer } from 'rxjs';
import { catchError, filter, map, mergeMap, pairwise, retry, startWith, switchMap, take, tap } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { ConfirmedOrderData, mapToOrderData, OrderDto } from '../model/cart';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { OrderPages, OrderViewControllerService } from './order-view-controller.service';
import { Pagination } from 'src/app/shared/classes/pagination';
import { HttpHeaderInterceptor } from '../interceptors/http-header';

@Injectable()

export class OrdersService implements OnInit {
  _orderToBeShown = new BehaviorSubject<OrderDto>(null);
  _trackingOrder = new BehaviorSubject<Array<OrderDto>>([]);
  _updatedAt = new Subject<string>();

  get activeOrder$(): Observable<Array<OrderDto>> {
    return this._trackingOrder.asObservable();
  }
  getCurrentActiveOrder(): OrderDto {
    return this._trackingOrder.value[0];
  }

  _thankyouData = new BehaviorSubject<{ storeName: string, storeId: number, isFavourite: boolean }>(null);
  setThankyouData(data: { storeName: string, storeId: number, isFavourite: boolean }) {
    this._thankyouData.next(data);
  }
  get thankyouData$(): Observable<{ storeName: string, storeId: number, isFavourite: boolean }> {
    return this._thankyouData.asObservable();
  }

  // forcedCheckingSub = new Subject<true>();
  // forceOrderUpdate() {
  //   this.forcedCheckingSub.next(true);
  // }

  constructor(private restApiService: RestApiService,
    private cartService: CartService,
    private authService: AuthService) {
    this.setUpInterval();
  }
  ngOnInit(): void {
  }

  get orderToBeShown$(): Observable<OrderDto> {
    //return the first order that 
    return this._trackingOrder.asObservable().pipe(map((o) => o[0]));
  }

  makeOrder(): Observable<number> {
    return this.restApiService.post('api/customer/orders', {}).pipe(
      map(resp => resp.data.order_id),
      tap((ordId) => { this.cartService.addItem(null, false, true).pipe(take(1)).subscribe(); }),
      // mergeMap((orderId: number) => this.cartService.addItem(null, false, true).pipe(map(() => orderId)))
    )
  }

  setUpInterval() {
    //first get initial orders array and updated_at time-stamp
    this.authService.isLoggedIn$().pipe(
      switchMap((isLogged) => {
        if (isLogged) return of(true);
        else return NEVER
      }),
      switchMap(() => this.restApiService.get('api/customer/orders')),
      take(1)
    ).subscribe(
      (resp) => {
        this._trackingOrder.next(resp.data.orders);
        this._updatedAt.next(resp.data.updated_at)
      }
    )

    //set up subsription for long polling   
    this.authService.isLoggedIn$().pipe(
      switchMap((isLogged) => {
        if (isLogged) return of(true);
        else return NEVER
      }),
      switchMap(() => this._updatedAt),
    ).subscribe(
      (u) => {
        this.restApiService.post('api/customer/orders/sync', { updated_at: u }).subscribe(
          (resp) => {
            if (resp.data.is_updated) this._trackingOrder.next(resp.data.orders);
            this._updatedAt.next(resp.data.updated_at);
          }
        )
      })
  }


  // setUpInterval() {
  //   this.authService.loggedUser$.pipe(
  //     switchMap((user) => {
  //       if (user) return merge(this.forcedCheckingSub, timer(0, 60000));
  //       else return NEVER
  //     }),
  //     switchMap(() => this.currentActiveOrder().pipe(retry(2))),
  //     startWith<any>({}),
  //     pairwise(),
  //     switchMap(([old, curr]) => {
  //       if (curr?.order_id !== old?.order_id || curr?.status !== old?.status) {
  //         return of(curr);
  //       } return NEVER
  //     }),
  //   ).subscribe(
  //     (currOrd) => this._trackingOrder.next(currOrd)
  //     // new Subject()
  //   )
  // }

  currentActiveOrder(): Observable<OrderDto> {
    return this.restApiService.get('api/customer/orders').pipe(
      map((resp) => {
        let ords: Array<OrderDto> = resp.data?.orders || [];
        return ords.find((o) => o.status === 'NEW' || o.status === 'READY' || o.status === 'COOKING' || o.status === 'DENY')
      })
    )
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
      }).pipe();
  }


  // checkForOrders
}
