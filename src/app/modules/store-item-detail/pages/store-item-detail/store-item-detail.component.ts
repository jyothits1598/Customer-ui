import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild, ElementRef, TemplateRef, ViewChildren, QueryList } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { finalize, takeUntil } from 'rxjs/operators';
import { CartData } from 'src/app/core/model/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { ItemModifierFormControlComponent } from '../../components/item-modifier-form-control.component';
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
export class StoreItemDetailComponent implements OnInit, OnChanges, OnDestroy {
  reqSubs: Subscription;
  selectedvalueChangeSubs: Subscription;
  @ViewChildren('mod') mods: QueryList<ItemModifierFormControlComponent>
  @ViewChild('observationElement', { read: ElementRef }) obsElement: ElementRef;
  @ViewChild('orderExistsTemp', { read: TemplateRef }) oETemp: TemplateRef<any>;

  @Input() item: StoreItemDetail & { storeId: number, storeName: string, isFavourite: boolean };
  @Input() isStoreOpen: boolean;

  itemDetail: StoreItemDetail
  selectedOptions: FormArray;
  itemCount: FormControl = new FormControl(1);
  addingToCart: boolean = false;
  totalAmount: any = 0;
  scrolled: boolean;
  makeCalculations: (itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) => number;

  unSubscribe$: Subject<boolean> = new Subject<boolean>();

  static_image_width = '?w=700,q=50,f=webp';

  show = true;

  constructor(private storeItemData: StoreItemDataService,
    private location: Location,
    private cartService: CartService,
    private ov: OrderViewControllerService,
    private sBSrv: SnackBarService,
    private ordSrv: OrdersService,
    private mdlSrv: ModalService,
    private scroll: ScrollService) {
    this.makeCalculations = this.cartService.makeCalculations;
  }
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    //clear previous subscription
    console.log('this is the changes', this.item)
    if (this.selectedvalueChangeSubs) this.selectedvalueChangeSubs.unsubscribe();
    if (this.reqSubs) this.reqSubs.unsubscribe();

    // this.reqSubs = this.storeItemData.itemDetail(this.item.storeId, this.item.id).pipe(takeUntil(this.unSubscribe$), finalize(() => this.loading = false)).subscribe(detail => {
    this.itemDetail = this.item;
    let control = this.itemDetail.modifiers.map((mod) => new FormControl());
    this.selectedOptions = new FormArray(control);
    this.selectedvalueChangeSubs = this.setUpSubscription();
    //initialise total amount
    this.totalAmount = this.makeCalculations(this.itemDetail.basePrice, [], 1)
    // });
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

  addToCart() {
    if (!this.isStoreOpen) {
      this.mdlSrv.openTemplateModal(this.oETemp, { data: { heading: 'Store is closed.', message: 'Sorry, no orders are being accepted now.' } });
      return;
    }

    if (this.selectedOptions.invalid) {
      this.selectedOptions.markAllAsTouched();

      //find the first invalid modifier
      const inval = this.mods.find(m => !m.isValid());
      this.scroll.scrollTo(inval.elem.nativeElement);

      return;
    }

    if (this.ordSrv.getCurrentActiveOrder()) {
      let storeName = this.ordSrv.getCurrentActiveOrder().store_name.charAt(0).toUpperCase() + this.ordSrv.getCurrentActiveOrder().store_name.slice(1);
      this.mdlSrv.openTemplateModal(this.oETemp, {
        data: {
          heading: 'You already have an order pending', message: `Please try again once your order from ${storeName} is complete.`
        }
      });
      return;
    }

    this.addingToCart = true;
    let itemDetail = { ...this.itemDetail };
    itemDetail.modifiers = this.selectedOptions.value.filter(m => m);

    let cartData: CartData = {
      storeId: this.item.storeId,
      storeName: this.item.storeName,

      items: [{ item: itemDetail, quantity: this.itemCount.value }]
    };

    this.cartService.addItem(cartData).pipe(takeUntil(this.unSubscribe$), finalize(() => this.addingToCart = false)).subscribe(() => {
      this.ov.showPage(OrderPages.Cart);
      setTimeout(() => {
        this.show = false;
        this.location.back();
      }, 0);
    },
      (err) => {
        if (err?.error?.error_msg[0].includes('Please try again once your order from')) {
          this.mdlSrv.openTemplateModal(this.oETemp, { data: err.error.error_msg[0] });
        }
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(true);
  }
  // observeIntersection() {
  //   this.interObserver = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  //     if (entries[0].isIntersecting) this.scrolledDown = false;
  //     else this.scrolledDown = true;
  //   });
  //   this.interObserver.observe(this.obsElement.nativeElement);
  // }


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
