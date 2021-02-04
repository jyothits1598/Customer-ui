import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { orders } from 'src/app/core/model/cart';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {
  constructor(
    private ordSrv: OrdersService,
    private cartSrv: CartService,
  ) { }
  unSub$ = new Subject<true>();
  ordData: orders;
  ngOnInit(): void {
        
  //           return this.ordSrv.getAllOrder()
  //         }
  //     ),
  //     takeUntil(this.unSub$)
  //   )
  //     .subscribe((data) => { this.ordData = data });
  // }

  }
}
