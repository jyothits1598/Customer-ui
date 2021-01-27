import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';

@Component({
  selector: 'order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.scss']
})
export class OrderContainerComponent implements OnInit {

  orderPages = OrderPages;
  currentPage$;
  constructor(private route: ActivatedRoute,
    private orderView: OrderViewControllerService) {
  }

  close() {
    this.orderView.showPage(null);
  }

  ngOnInit(): void {
    this.currentPage$ = this.orderView.getCurrentPage$();
  }

}
