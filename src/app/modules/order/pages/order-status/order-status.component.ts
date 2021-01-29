import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, NEVER, of, Subject, timer } from 'rxjs';
import { finalize, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ConfirmedOrderData, OrderDto } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {

  constructor(private ordSrv: OrdersService,
    private cartSrv: CartService,
    private ordView: OrderViewControllerService) { }

  unSub$ = new Subject<true>();
  ordData: ConfirmedOrderData;
  loading: boolean;

  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number = this.cartSrv.makeCalculations;
  calcTotal: (cartData) => number = this.cartSrv.calculateTotalAmount;

  ngOnInit(): void {
    this.ordSrv.orderToBeShown$.pipe(
      switchMap((id) =>
        timer(0, 10000).pipe(
          map(() => id),
          switchMap((id) => {
            if (!this.ordData || (this.ordData.status !== 'READY' && this.ordData.status !== 'COMPLETE')) return this.ordSrv.getOrderDetails(id);
            else return NEVER
          }))
      ),
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

  markAsComplete() {
    this.loading = true;
    this.ordSrv.markOrderComplete(this.ordData.id).pipe(takeUntil(this.unSub$), finalize(() => this.loading = false)).subscribe(() => {
      this.ordSrv.setThankyouData({ storeName: this.ordData.storeName });
      this.ordView.showPage(OrderPages.Thankyou);
    });
  }

  getCount(oD: ConfirmedOrderData) {
    return oD.items.reduce((i1, i2) => i1 + i2.quantity, 0);
  }
 
}
