import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartData } from '../../model/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit {

  cartData$: Observable<CartData>
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartData$ = this.cartService.cartData$;
  }

}
