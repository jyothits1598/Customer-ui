import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'order-thank-you',
  templateUrl: './order-thank-you.component.html',
  styleUrls: ['./order-thank-you.component.scss']
})
export class OrderThankYouComponent implements OnInit {
  thankyouData$: Observable<{ storeName: string, storeId: number }>;
  constructor(private ordSrv: OrdersService) { }

  ngOnInit(): void {
    this.thankyouData$ = this.ordSrv.thankyouData$;
  }

}
