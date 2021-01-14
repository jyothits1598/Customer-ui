import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map, take, tap } from 'rxjs/operators';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CartData } from '../model/cart';
import { ComponentModalRef } from '../model/modal';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData = new BehaviorSubject<CartData>(null);

  get cartData$(): Observable<CartData> {
    return this.cartData.asObservable();
  }

  get cartItemCount$(): Observable<number> {
    return this.cartData.asObservable().pipe(
      map(item => this.calculateItemCount(item))
    )
  }

  get cartTotalAmount$(): Observable<number> {
    return this.cartData.asObservable().pipe(
      map(item => this.calculateTotalAmount(item))
    )
  }

  get presentCartData() {
    return this.cartData.value;
  }

  constructor(private modalService: ModalService) { }

  //returns observable because one of the cases involves user intervention
  addItem(item: CartData): Observable<boolean> {
    if (this.presentCartData) {
      //check if the items are form same store
      if (this.presentCartData.storeId === item.storeId) {
        let cartData = { ...this.presentCartData };

        //in the current inplementation only one item is added at a time, hence index 0;
        cartData.items.push(item.items[0])
        this.cartData.next(cartData);
        return of(true);
      } else {

        //item is from an other store
        let modalRef: ComponentModalRef<ConfirmationDialogComponent> = this.modalService.openComponentModal(ConfirmationDialogComponent);
        return modalRef.instance.userDecision.pipe(take(1), tap(() => { this.cartData.next(item) }), finalize(() => { modalRef.dismiss() }));
      }
    }

    // there is no previous item in cart
    else {
      this.cartData.next(item);
      return of(true);
    }

  }

  calculateItemCount(cartData: CartData) {
    return (cartData && cartData.items?.length) ? cartData.items.length : 0;
  }

  calculateTotalAmount(cartData: CartData) {
    console.log('calculate total amount called', cartData);
    let result: number = 0;

    if (cartData?.items.length) {
      cartData.items.forEach(
        (item) => {
          console.log('make calculation total, ', item)
          result = result + this.makeCalculations(item.item.basePrice, item.item.modifiers, item.quantity);
        }
      )
    }

    return result;
  }



  //calculate price for each item
  makeCalculations(itemBasePrice: number, selectedModifiers: Array<ItemModifier>, count: number) {
    let total = itemBasePrice;

    //remove null values
    let selectedMods = selectedModifiers.filter(m => m);


    selectedMods.forEach((modifier: ItemModifier) => {

      modifier.options.sort((opt1, opt2) => opt1.price - opt2.price);
      // console.log('options before splice', modifier.options, modifier.freeSelection);
      let options = [...modifier.options];

      options.splice(0, modifier.freeSelection);

      // console.log('options after splice', options);
      let optTotal: number = options.reduce((o1, o2) => o1 + o2.price, 0);

      total += optTotal;

    });

    return total * count;

  }
}
