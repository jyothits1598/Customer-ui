import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartData } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }
  cartData$: Observable<CartData>;
  cartTotal$: Observable<number>;

  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number;

  ngOnInit(): void {
    this.makeCalculations = this.cartService.makeCalculations;
    this.cartData$ = this.cartService.cartData$;
    this.cartTotal$ = this.cartService.cartTotalAmount$;
  }

  deleteItem(itemId: number) {
    let cart = this.cartService.presentCartData;
     let index = cart.items
  }

  closeCart() {
    this.router.navigate([{ outlets: { 'order': null } }])
  }


}
