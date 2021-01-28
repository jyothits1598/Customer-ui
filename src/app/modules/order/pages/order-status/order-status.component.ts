import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, NEVER, of, Subject, timer } from 'rxjs';
import { map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ConfirmedOrderData, OrderDto } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {

  constructor(private ordSrv: OrdersService,
    private cartSrv: CartService) { }
  unSub$ = new Subject<true>();
  ordData: ConfirmedOrderData;
  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number = this.cartSrv.makeCalculations;
  calcTotal: (cartData) => number = this.cartSrv.calculateTotalAmount;

  ngOnInit(): void {
    this.ordSrv.orderToBeShown$.pipe(
      switchMap((id) => {
        if (!this.ordData || this.ordData.status !== 'COMPLETED') return timer(0, 10000).pipe(map(() => id));
        else return NEVER;
      }),
      switchMap((id) => this.ordSrv.getOrderDetails(id)),
      takeUntil(this.unSub$)
    )
      .subscribe((data) => { this.ordData = data })
  }

  modifiersToOptionNameArr(mods: Array<ItemModifier>) {
    let m = mods.map(mod => mod.options.map(op => op.name));
    return Array.prototype.concat.apply([], m);
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
  }

}
