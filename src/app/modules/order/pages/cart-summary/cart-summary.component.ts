import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
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

  cartTotal$: Observable<number>;
  unsub$ = new Subject<true>();

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotalAmount$;
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

  ngOnDestroy(): void {
    this.unsub$.next(true);
  }

}
