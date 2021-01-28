import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from 'src/app/core/model/cart';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'tracking-button',
  templateUrl: './tracking-button.component.html',
  styleUrls: ['./tracking-button.component.scss']
})
export class TrackingButtonComponent implements OnInit {

  ordPgs = OrderPages;
  trackingOrder$: Observable<OrderDto>;
  currOrderPage$: Observable<OrderPages>;

  constructor(private ordSrv: OrdersService,
    private orderView: OrderViewControllerService) { }

  ngOnInit(): void {
    this.trackingOrder$ = this.ordSrv.trackingOrder$;
    this.currOrderPage$ = this.orderView.getCurrentPage$();

  }

  openStatus(id: number) {
    this.ordSrv.setOrderToBeShown(id);
    this.orderView.showPage(OrderPages.OrderStatus)
  }

}
