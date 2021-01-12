import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule
  ],
  exports: [CartComponent]
})
export class CartModule { }
