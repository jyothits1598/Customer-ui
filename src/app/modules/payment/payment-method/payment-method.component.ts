import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {PaymentService} from '../services/payment.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  clickStatus:string = 'true';
  paymentDetails = new Array();
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    private paymentService: PaymentService
  ) {
    this.paymentService.payMentCardDetails().subscribe(Details => {
      if(Details.length > 0){
       this.paymentDetails = Details;
      } 
     });
   }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messageEvent.emit(this.clickStatus)
  }


  
}
