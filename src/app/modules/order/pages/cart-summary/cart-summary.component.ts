import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { OrderSummary } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit, OnDestroy {
  showPaymentOpt: boolean = false;
  paymentInProg: boolean = false;

  unSub$ = new Subject<true>();

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private orderView: OrderViewControllerService
  ) { }


  orderSummary$: Observable<OrderSummary>;
  unsub$ = new Subject<true>();

  ngOnInit(): void {
    this.orderSummary$ = this.cartService.orderSummary$;
  }

  order() {
    this.paymentInProg = true;
    this.orderService.makeOrder().pipe(
      takeUntil(this.unsub$),
      finalize(() => this.paymentInProg = false)
    ).subscribe(
      (orderId) => { this.orderView.showPage(OrderPages.OrderStatus); this.orderService.setOrderToBeShown(orderId) }
    );
  }

  addPaymentOpt() {
    this.orderView.showPage(OrderPages.AddPaymentOptions);
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
  }

}
