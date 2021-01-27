import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(private ordSrv: OrdersService) { }

  ngOnInit(): void {
    this.ordSrv.orderToBeShown$.subscribe(
      order => console.log('order to be shown', order)
    )
  }

}
