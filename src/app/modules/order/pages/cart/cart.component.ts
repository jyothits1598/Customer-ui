import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private orderViewSrv: OrderViewControllerService
  ) { }
  cartTotal$: Observable<number>;
  unsub$ = new Subject<true>();

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotalAmount$;
  }

  continue() {
    this.orderViewSrv.showPage(OrderPages.CartSummary)
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
  }

}
