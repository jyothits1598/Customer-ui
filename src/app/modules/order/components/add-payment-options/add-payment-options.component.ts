import { Component, OnInit } from '@angular/core';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';

@Component({
  selector: 'add-payment-options',
  templateUrl: './add-payment-options.component.html',
  styleUrls: ['./add-payment-options.component.scss']
})
export class AddPaymentOptionsComponent implements OnInit {

  constructor(private orderView: OrderViewControllerService) { }

  ngOnInit(): void {
  }

  goBack() {
    this.orderView.showPage(OrderPages.CartSummary);
  }

}
