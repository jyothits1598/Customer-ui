import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';
import { CartData } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartData = new BehaviorSubject<CartData>(null);

  get cartData$(): Observable<CartData>{
    return this.cartData.asObservable();
  } 

  constructor() { }

  addItem(item: CartData) {
    this.cartData.next(item);
  }

  //calculate price for each item
  makeCalculations(itemBasePrice: number, selectedModifiers: Array<ItemModifier>) {
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

    return total;

  }
}
