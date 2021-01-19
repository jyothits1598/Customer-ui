import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  orderStatus:string = 'orders'; /**Cart status empty,checkout,continue,placeOrder,bankcards,addcard,orders,thankyou */
  orderPrepareStatus:string = 'orderReady';/**confirmingOrder,preparingOrder,orderReady */
  constructor() { }

  ngOnInit(): void {
  }

}
