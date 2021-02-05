import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ConfirmedOrderData } from 'src/app/core/model/cart';
import { Subject } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { OrderPagination, Pagination } from 'src/app/shared/classes/pagination';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit, OnDestroy {
  constructor(
    private ordSrv: OrdersService,
    private cartSrv: CartService,
  ) { }
  ngOnDestroy(): void {
    this.unSub$.next(true);
  }
  unSub$ = new Subject<true>();
  ordData: Array<ConfirmedOrderData> = [];
  pagination: OrderPagination;
  loading: boolean;

  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number = this.cartSrv.makeCalculations;
  calcTotal: (cartData) => number = this.cartSrv.calculateTotalAmount;

  ngOnInit(): void {
    this.pagination = new OrderPagination(this.ordSrv.getAllOrder.bind(this.ordSrv));
    this.pagination.getNext().pipe(takeUntil(this.unSub$)).subscribe(resp => this.ordData.splice(this.ordData.length, 0, ...resp));
  }

  modifiersToOptionNameArr(mods: Array<ItemModifier>) {
    let m = mods.map(mod => mod.options.map(op => op.name));
    return Array.prototype.concat.apply([], m);
  }


  loadNext() {
    this.loading = true;
    this.pagination.getNext().pipe(takeUntil(this.unSub$), finalize(() => this.loading = false)).subscribe(resp => this.ordData.splice(this.ordData.length, 0, ...resp));
  }

  getCount(oD: ConfirmedOrderData) {
    return oD.items.reduce((i1, i2) => i1 + i2.quantity, 0);
  }
 
}
