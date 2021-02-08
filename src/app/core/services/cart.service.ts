import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { ItemModifier, StoreItemDetail } from 'src/app/modules/store-item-detail/model/store-item-detail';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CartData, CartDto, mapToCartData, MapToDto, OrderSummary } from '../model/cart';
import { ComponentModalRef } from '../model/modal';
import { AuthService } from './auth.service';
import { ModalService } from './modal.service';
import { OrderPages, OrderViewControllerService } from './order-view-controller.service';
import { RestApiService } from './rest-api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartData = new BehaviorSubject<CartData>(null);

  storageIdentifier: string = 'cartData';

  get presentCartData() {
    return this.cartData.value;
  }

  constructor(private modalService: ModalService,
    private storageService: StorageService,
    private authService: AuthService,
    private restApiService: RestApiService,
    private orderView: OrderViewControllerService
  ) {
    this.authService.loggedUser$.subscribe((user) => {
      if (!this.presentCartData) {
        let savedData = this.storageService.get(this.storageIdentifier);
        if (savedData) this.addItem(savedData).subscribe();
        else {
          if (user) {
            //try to fetch from backend
            this.getCart().subscribe((cart) => { if (cart) { this.cartData.next(cart); this.storageService.store(this.storageIdentifier, cart) } })
          }
        }
      } else this.addItem(this.presentCartData).subscribe();
    })
  }

  get cartData$(): Observable<CartData> {
    return this.cartData.asObservable();
  }

  // get cartItemCount$(): Observable<number> {
  //   return this.cartData.asObservable().pipe(
  //     map(item => this.calculateItemCount(item))
  //   )
  // }

  // get cartTotalAmount$(): Observable<number> {
  //   return this.cartData.asObservable().pipe(
  //     map(item => this.calculateSubTotal(item))
  //   )
  // }

  get orderSummary$(): Observable<OrderSummary> {
    return this.cartData.asObservable().pipe(
      map(d => this.calculateSummary(d))
    )
  }

  calculateSummary(c: CartData) {
    let count = this.calculateItemCount(c);
    if (!count) return null;

    let subTotal = this.calculateSubTotal(c);
    let surChrg = subTotal * 0.02;
    let total = subTotal + surChrg;
    return {
      subtotal: Math.round((subTotal + Number.EPSILON) * 100) / 100,
      surcharge: Math.round((surChrg + Number.EPSILON) * 100) / 100,
      total: Math.round((total + Number.EPSILON) * 100) / 100,
      totalItemCount: count
    }
  }

  // TODO: rewrite this function with better implementation
  addItem(cData: CartData, replaceItems: boolean = false, skipBackend: boolean = false): Observable<boolean> {
    let newCartData = this.presentCartData ? { ...this.presentCartData } : null;
    let resultObs: Observable<any>;

    if (newCartData && cData) {
      //check if the items are fromm same store
      if (newCartData.storeId === cData.storeId) {
        //in the current inplementation only one item is added at a time, hence index 0;
        if (replaceItems) newCartData = cData;
        else {
          let item = newCartData.items.find((item) => this.checkIfIdentical(item.item, cData.items[0].item));
          if (item) item.quantity += cData.items[0].quantity;
          else newCartData.items.push(cData.items[0]);
        }
        resultObs = of(true);
      } else {
        //item is from an other store
        let modalRef: ComponentModalRef<ConfirmationDialogComponent> = this.modalService.openComponentModal(ConfirmationDialogComponent);
        resultObs = modalRef.instance.userDecision.pipe(take(1), tap(() => { newCartData = cData }), finalize(() => { modalRef.dismiss() }));
      }
    }
    else {
      // there is no previous item in cart
      newCartData = cData;
      resultObs = of(true);
    }
    //post cart to backend if signed in
    if (this.authService.isLoggedIn && !skipBackend) resultObs = resultObs.pipe(switchMap(() => this.postCart(newCartData)));
    return resultObs.pipe(tap(() => { this.cartData.next(newCartData); if (!newCartData) this.orderView.showPage(OrderPages.Cart); this.storageService.store(this.storageIdentifier, newCartData) }));
  }

  //check if both items are same and have the same modifier configuration
  checkIfIdentical(item1: StoreItemDetail, item2: StoreItemDetail) {
    if (item1.id !== item2.id || item1.modifiers.length !== item2.modifiers.length) return false;
    for (const m1 of item1.modifiers) {
      //check if the same mod is present
      const m2 = item2.modifiers.find((m) => m.id === m1.id);
      if (m2) {
        for (const op1 of m1.options) {
          const op2 = m2.options.find((o) => o.id === op1.id);
          if (!op2) return false;
        }
      } else return false;
    }
    return true;
  }

  deleteItem(itemId: number): Observable<boolean> {
    let pCart = { ...this.presentCartData };
    pCart.items = [...pCart.items]
    let itemIndex = pCart.items.findIndex(item => item.item.id === itemId);
    pCart.items.splice(itemIndex, 1);
    if (pCart.items.length) return this.addItem(pCart, true);
    else return this.addItem(null);
  }

  calculateItemCount(cartData: CartData) {
    return (cartData && cartData.items?.length) ? cartData.items.length : 0;
  }

  calculateSubTotal(cartData: CartData) {
    let result: number = 0;
    if (cartData?.items.length) {
      cartData.items.forEach(
        (item) => {
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
      let options = [...modifier.options];

      // options.splice(0, modifier.freeSelection);

      let optTotal: number = options.reduce((o1, o2) => o1 + o2.price, 0);

      total += optTotal;

    });

    return Math.round(((total * count) + Number.EPSILON) * 100) / 100;;
  }

  postCart(cartData: CartData) {
    if (!cartData) return this.restApiService.delete('api/customer/cart');
    else return this.restApiService.post('api/customer/cart', MapToDto(cartData));
  }

  getCart() {
    return this.restApiService.get('api/customer/cart').pipe(map((cart: { data: CartDto }) => cart.data ? mapToCartData(cart.data) : null));
  }

  debug() {
    this.cartData.next(null)
  }

  //test function
  // testCheckIfIdentical() {
  //   //case 1 equal
  //   let c1i1: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         minSelection: 0,
  //         maxSelection: 0,
  //         freeSelection: 0,
  //         options: [
  //           { id: 1, name: 'dummy', price: 0 }
  //         ]
  //       }
  //     ]
  //   };
  //   let c1i2: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         minSelection: 0,
  //         maxSelection: 0,
  //         freeSelection: 0,
  //         options: [
  //           { id: 1, name: 'dummy', price: 0 }
  //         ]
  //       }
  //     ]
  //   };
  //   const c1 = this.checkIfIdentical(c1i1, c1i2)
  //   console.log('required answer, true', c1)

  //   //different modifier
  //   let c2i1: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: [
  //       {
  //         id: 2,
  //         name: 'dummy',
  //         minSelection: 0,
  //         maxSelection: 0,
  //         freeSelection: 0,
  //         options: [
  //           { id: 1, name: 'dummy', price: 0 }
  //         ]
  //       }
  //     ]
  //   };
  //   let c2i2: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         minSelection: 0,
  //         maxSelection: 0,
  //         freeSelection: 0,
  //         options: [
  //           { id: 1, name: 'dummy', price: 0 }
  //         ]
  //       }
  //     ]
  //   };

  //   const c2 = this.checkIfIdentical(c2i1, c2i2);
  //   console.log('required answer, false', c2)

  //   //case 3 - same modifier and different items
  //   let c3i1: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         minSelection: 0,
  //         maxSelection: 0,
  //         freeSelection: 0,
  //         options: [
  //           { id: 1, name: 'dummy', price: 0 }
  //         ]
  //       }
  //     ]
  //   };
  //   let c3i2: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         minSelection: 0,
  //         maxSelection: 0,
  //         freeSelection: 0,
  //         options: [
  //           { id: 2, name: 'dummy', price: 0 }
  //         ]
  //       }
  //     ]
  //   };

  //   const c3 = this.checkIfIdentical(c3i1, c3i2);
  //   console.log('required answer, false', c3)

  //   // case 4 - one does not have modifiers
  //   let c4i1: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         minSelection: 0,
  //         maxSelection: 0,
  //         freeSelection: 0,
  //         options: [
  //           { id: 1, name: 'dummy', price: 0 }
  //         ]
  //       }
  //     ]
  //   };
  //   let c4i2: StoreItemDetail = {
  //     id: 1,
  //     name: 'dummy',
  //     basePrice: 10,
  //     image: 'dummy',
  //     storeId: 1,
  //     modifiers: []
  //   };
  //   const c4 = this.checkIfIdentical(c4i1, c4i2)
  //   console.log('required answer, false', c4)


  // }
}
