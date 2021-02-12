import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, NEVER, of, Subject, timer } from 'rxjs';
import { finalize, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ConfirmedOrderData, OrderDto } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {

  constructor(
    private ordSrv: OrdersService,
    private cartSrv: CartService,
    private ordView: OrderViewControllerService,
    private lS: LayoutService) { }

  unSub$ = new Subject<true>();
  ordData: ConfirmedOrderData;
  loading: boolean;

  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number = this.cartSrv.makeCalculations;
  calcSum = this.cartSrv.calculateSummary.bind(this.cartSrv);

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

  markAsComplete(orderStatus) {
    this.loading = true;
    this.ordSrv.markOrderComplete(this.ordData.id, orderStatus).pipe(takeUntil(this.unSub$), finalize(() => this.loading = false)).subscribe(() => {
      this.ordSrv.setThankyouData({ storeName: this.ordData.storeName, storeId: this.ordData.storeId, isFavourite: this.ordData.isFavourite });
      this.ordView.showPage(OrderPages.Thankyou);
    });
  }

  getCount(oD: ConfirmedOrderData) {
    return oD.items.reduce((i1, i2) => i1 + i2.quantity, 0);
  }

  onViewStore() {
    if (this.lS.isMobile) this.ordView.showPage(null);
  }

  progressbarWidth(preparedByProgress) {
    if (preparedByProgress >= 50) {
      return "0%";
    } else if (preparedByProgress >= 40) {
      return "20%"
    } else if (preparedByProgress >= 30) {
      return "40%"
    } else if (preparedByProgress >= 20) {
      return "60%"
    } else if (preparedByProgress >= 10) {
      return "80%"
    } else if (preparedByProgress == 0) {
      return "100%"
    }
  }

}
