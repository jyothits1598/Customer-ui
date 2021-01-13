import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';

@NgModule({
  declarations: [CartComponent, CartButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [CartComponent, CartButtonComponent]
})
export class CartModule { }
