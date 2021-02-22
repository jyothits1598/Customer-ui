import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { CartData, OrderSummary } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';

@Component({
  selector: 'cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.scss']
})
export class CartContentComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private router: Router,
    private orderView: OrderViewControllerService
  ) { }
  cartData$: Observable<CartData>;
  orderSummary$: Observable<OrderSummary>;

  unsub$ = new Subject<true>();

  itemDelInProg: boolean = false;
  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number;

  ngOnInit(): void {
    this.makeCalculations = this.cartService.makeCalculations;
    this.cartData$ = this.cartService.cartData$;
    this.orderSummary$ = this.cartService.orderSummary$;
  }

  deleteItem(itemId: number) {
    this.itemDelInProg = true;
    this.cartService.deleteItem(itemId).pipe(takeUntil(this.unsub$), finalize(() => this.itemDelInProg = false)).pipe().subscribe();
  }

  continue() {
    this.router.navigate([{ outlets: { 'order': ['cart-summary'] } }]);
  }

  ngOnDestroy(): void {
    this.unsub$.next(true);
  }

  modifiersToOptionNameArr(mods: Array<ItemModifier>) {
    let m = mods.map(mod => mod.options.map(op => op.name));
    return Array.prototype.concat.apply([], m);
  }
  
  close() {
    this.orderView.showPage(null);
  }

}
