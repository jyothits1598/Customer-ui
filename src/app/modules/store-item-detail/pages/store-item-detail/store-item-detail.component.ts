import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { templateVisitAll } from '@angular/compiler';
import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { finalize, takeUntil } from 'rxjs/operators';
import { CartData } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { ItemModifier, StoreItemDetail } from '../../model/store-item-detail';
import { StoreItemDataService } from '../../services/store-item-data.service';

@Component({
  selector: 'store-item-detail',
  templateUrl: './store-item-detail.component.html',
  styleUrls: ['./store-item-detail.component.scss'],
  animations: [
    trigger('slideIn', [
      transition('void=>*', [
        animate('.2s', keyframes([
          style({ transform: 'translateY(50%)', opacity: 0 }),
          style({ transform: 'translateY(0)', opacity: 1 }),
        ]))
      ]),
      transition('*=>void', [
        animate('.1s', keyframes([
          style({ transform: 'translateY(0)', opacity: 1 }),
          style({ transform: 'translateY(5%)', opacity: 0 }),
        ]))
      ])
    ])
  ]
})
export class StoreItemDetailComponent implements OnChanges, OnDestroy {
  reqSubs: Subscription;
  selectedvalueChangeSubs: Subscription;

  @Input() item: { storeId: number, storeName: string, itemId: number };
  itemDetail: StoreItemDetail
  loading: boolean = true;
  show = true;
  selectedOptions: FormArray;
  itemCount: FormControl = new FormControl(1);

  totalAmount: any = 0;
  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number;

  unSubscribe$: Subject<boolean> = new Subject<boolean>();
  itemAddedToCart: boolean = false;

  constructor(private storeItemData: StoreItemDataService,
    private location: Location,
    private cartService: CartService) {
    this.makeCalculations = this.cartService.makeCalculations;
  }

  ngOnChanges(): void {
    //clear previous subscription
    if (this.selectedvalueChangeSubs) this.selectedvalueChangeSubs.unsubscribe();
    if (this.reqSubs) this.reqSubs.unsubscribe();

    this.reqSubs = this.storeItemData.itemDetail(this.item.storeId, this.item.itemId).pipe(takeUntil(this.unSubscribe$), finalize(() => this.loading = false)).subscribe(detail => {
      this.itemDetail = detail;
      let control = this.itemDetail.modifiers.map((mod) => new FormControl());
      this.selectedOptions = new FormArray(control);
      this.selectedvalueChangeSubs = this.setUpSubscription();
    });
  }

  setUpSubscription() {
    return merge(
      this.selectedOptions.valueChanges, this.itemCount.valueChanges
    ).pipe(takeUntil(this.unSubscribe$)).subscribe(() => this.totalAmount = this.makeCalculations(this.itemDetail.basePrice, this.selectedOptions.value, this.itemCount.value));
  }

  close() {
    this.show = false;
    setTimeout(() => {
      this.location.back();
    }, 200);
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
  }

  addToCart() {
    if (this.selectedOptions.invalid) {
      this.selectedOptions.markAllAsTouched();
      return;
    }
    let itemDetail = { ...this.itemDetail };
    itemDetail.modifiers = this.selectedOptions.value.filter(m => m);

    let cartData: CartData = {
      storeId: this.item.storeId,
      storeName: this.item.storeName,

      items: [{ item: itemDetail, quantity: this.itemCount.value}]
    };

    this.cartService.addItem(cartData).pipe(takeUntil(this.unSubscribe$)).subscribe(() => {
      this.itemAddedToCart = true;
    });
  }



  // getSelectedCartsDetails() {
  //   this.cartAmount = 0;
  //   if (this.selectedOptions.value) {
  //     this.selectedOptions.value.forEach(mod => {
  //       if (mod) {
  //         mod.forEach(content => {
  //           this.cartAmount = this.cartAmount + parseFloat(content.price);
  //         });
  //       }
  //     });
  //   }
  // }
}
