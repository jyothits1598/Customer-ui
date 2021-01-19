import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartData } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {
  doPayment: boolean = false;
  cartData$: Observable<CartData>;
  cartItemCount$: Observable<number>;
  cartTotalAmount$: Observable<number>;
  constructor(private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartData$ = this.cartService.cartData$;
    this.cartItemCount$ = this.cartService.cartItemCount$;
    this.cartTotalAmount$ = this.cartService.cartTotalAmount$;
  } 

  openCart() {
    this.router.navigate([{ outlets: { 'order': ['cart'] } }])
  }

}
