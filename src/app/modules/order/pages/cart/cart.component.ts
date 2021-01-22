import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartData } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }
  cartTotal$: Observable<number>;
  unsub$ = new Subject<true>();

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotalAmount$;
  }

  continue() {
    this.router.navigate([{ outlets: { 'order': ['cart-summary'] } }]);
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
  }

}
