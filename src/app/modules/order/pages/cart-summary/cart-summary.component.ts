import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  doPayment:boolean = false;
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  cartTotal$: Observable<number>;
  unsub$ = new Subject<true>();

  ngOnInit(): void {
    this.cartTotal$ = this.cartService.cartTotalAmount$;
  }

  addPayment(){
    this.router.navigate([{ outlets: { 'order': ['add-payment-opt'] } }]);

  }

  makePayment() {
    this.doPayment=true;
  }

}
