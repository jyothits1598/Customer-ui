import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { ItemModifier } from 'src/app/modules/store-item-detail/model/store-item-detail';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { CartData, CartDto, mapToCartData, MapToDto } from '../model/cart';
import { ComponentModalRef } from '../model/modal';
import { AuthService } from './auth.service';
import { ModalService } from './modal.service';
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
    private restApiService: RestApiService
  ) {

    this.authService.loggedUser$.subscribe((user) => {
      if (user) {
        //try to fetch from backend
        this.getCart().subscribe((cart) => { this.cartData.next(cart) })
      } else {
        //try to fetch from localstorage
        let cartData = this.storageService.get(this.storageIdentifier);
        if (cartData) {
        } this.cartData.next(cartData);
      }
    })


  }


  addItem(item: CartData): Observable<boolean> {
    let presentCartData = this.presentCartData;
    let resultObs: Observable<any>;

    if (presentCartData) {
      //check if the items are form same store
      if (this.presentCartData.storeId === item.storeId) {
        let cartData = { ...this.presentCartData };

        //in the current inplementation only one item is added at a time, hence index 0;
        cartData.items.push(item.items[0])
        // this.cartData.next(cartData);
        resultObs = of(true);
      } else {

        //item is from an other store
        let modalRef: ComponentModalRef<ConfirmationDialogComponent> = this.modalService.openComponentModal(ConfirmationDialogComponent);
        resultObs = modalRef.instance.userDecision.pipe(take(1), finalize(() => { modalRef.dismiss() }));
      }
    }

    // there is no previous item in cart
    else {
      // this.cartData.next(item);
      resultObs = of(true);
    }
    if (this.authService.isLoggedIn) resultObs = resultObs.pipe(switchMap((val) => this.postCart(item)));

    return resultObs.pipe(tap(() => { this.cartData.next(item); this.storageService.store(this.storageIdentifier, item) }));
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

  deleteItem(itemId: number): Observable<boolean> {
    let pCart = this.presentCartData;
    let itemIndex = pCart.items.findIndex(item => item.item.id === itemId);
    pCart.items.slice(itemIndex, 1);

    return this.addItem({ ...pCart });
  }

  postCart(cartData: CartData) {
    return this.restApiService.post('api/customer/cart', MapToDto(cartData));
  }

  getCart() {
    return this.restApiService.get('api/customer/cart').pipe(map((cart: { data: CartDto }) => mapToCartData(cart.data)));
  }
}
