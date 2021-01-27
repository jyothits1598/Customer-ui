import { Injectable } from '@angular/core';
import { BehaviorSubject, NEVER, Observable } from 'rxjs';
import { interval, never, timer } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  _orderToBeShown = new BehaviorSubject<number>(null);

  constructor(private restApiService: RestApiService,
    private cartService: CartService,
    private authService: AuthService) {
    this.setUpInterval();
  }

  setOrderToBeShown(orderId: number) {
    this._orderToBeShown.next(orderId);
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

  setUpInterval() {
    console.log('this is set up interval')
    this.authService.loggedUser$.pipe(
      tap(user => console.log('got a user')),
      switchMap((user) => {
        if (user) return interval(10000)
        else return NEVER
      }),
    ).pipe(switchMap(() => this.restApiService.get('api/customer/orders').pipe(map((resp) => resp.data.orders[0]))))
    // .subscribe((eve) => { console.log('checking for orders', eve) })

    interval(1000).pipe(map(() => { }))
  }

  getOrderDetails(orderId) {
    return this.restApiService.get('api/customer/orders?order_id=' + orderId).pipe((resp: any) => resp.data);
  }


  // checkForOrders
}
