import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CartData, CartDto, mapToCartData, MapToDto } from '../model/cart';
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

  constructor(private modalService: ModalService,
    private storageService: StorageService,
    private authService: AuthService,
    private restApiService: RestApiService,
    private orderView: OrderViewControllerService
  ) {
    this.authService.loggedUser$.pipe(take(1)).subscribe((user) => {
      if (!this.presentCartData) {
        let savedData = this.storageService.get(this.storageIdentifier);
        if (savedData) this.addItem(savedData).subscribe();
        else {
          if (user) {
            //try to fetch from backend
            this.getCart().subscribe((cart) => { if (cart) { this.cartData.next(cart); this.storageService.store(this.storageIdentifier, cart) } })
          }
        }
      }
    })
  }

  // TODO: rewrite this function with better implementation
  addItem(cData: CartData, replaceItems: boolean = false, skipBackend: boolean = false): Observable<boolean> {
    console.log('add item called', cData);
    let newCartData = this.presentCartData ? { ...this.presentCartData } : null;
    let resultObs: Observable<any>;

    if (newCartData && cData) {
      //check if the items are fromm same store
      if (newCartData.storeId === cData.storeId) {
        //in the current inplementation only one item is added at a time, hence index 0;
        if (replaceItems) newCartData = cData;
        else newCartData.items.push(cData.items[0]);
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
      console.log('moiddle of flow', this.authService.isLoggedIn)
    }
    //post cart to backend if signed in
    if (this.authService.isLoggedIn && !skipBackend) resultObs = resultObs.pipe(switchMap(() => this.postCart(newCartData)));
    return resultObs.pipe(tap(() => { this.cartData.next(newCartData); if(!newCartData) this.orderView.showPage(OrderPages.Cart); this.storageService.store(this.storageIdentifier, newCartData) }));
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

  calculateTotalAmount(cartData: CartData) {
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

      options.splice(0, modifier.freeSelection);

      let optTotal: number = options.reduce((o1, o2) => o1 + o2.price, 0);

      total += optTotal;

    });

    return total * count;
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
}
