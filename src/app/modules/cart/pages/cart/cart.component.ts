import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  orderStatus:string = 'orders'; /**Cart status empty,checkout,continue,placeOrder,bankcards,addcard,orders,thankyou */
  orderPrepareStatus:string = 'orderReady';/**confirmingOrder,preparingOrder,orderReady */
  constructor() { }

  ngOnInit(): void {
  }

}
