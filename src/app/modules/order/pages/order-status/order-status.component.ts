import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {

  constructor(private ordSrv: OrdersService) { }
  unSub$ = new Subject<true>();

  ngOnInit(): void {
    this.ordSrv.orderToBeShown$.pipe(
      takeUntil(this.unSub$),
      switchMap((id) => this.ordSrv.getOrderDetails(id))
    ).subscribe((id) => { console.log('order to be shown', id) })
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
  }

}
