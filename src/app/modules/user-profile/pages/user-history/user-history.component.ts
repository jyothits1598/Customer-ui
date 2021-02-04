import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ConfirmedOrderData, orders } from 'src/app/core/model/cart';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OrderPagination, Pagination } from 'src/app/shared/classes/pagination';
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
  ngOnInit(): void {
    this.pagination = new OrderPagination(this.ordSrv.getAllOrder.bind(this.ordSrv));
    this.pagination.getNext().pipe(takeUntil(this.unSub$)).subscribe(resp => this.ordData.splice(this.ordData.length, 0, ...resp));
    //         }
    //     ),
    //     takeUntil(this.unSub$)
    //   )
    //     .subscribe((data) => { this.ordData = data });
    // }

  }

  loadNext() {
    this.pagination.getNext().pipe(takeUntil(this.unSub$)).subscribe(resp => this.ordData.splice(this.ordData.length, 0, ...resp));
  }
}
