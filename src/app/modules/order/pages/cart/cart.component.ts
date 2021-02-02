import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private orderViewSrv: OrderViewControllerService,
    private authService: AuthService,
    private router: Router,
  ) { }
  cartTotal$: Observable<number>;
  unsub$ = new Subject<true>();

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotalAmount$;
  }

  continue() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/auth/signin'], { queryParams: { redirect: this.router.url } });
      this.orderViewSrv.showPage(null);
    }
    else this.orderViewSrv.showPage(OrderPages.CartSummary)
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
  }

}
