import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CartComponent, CartButtonComponent, PaymentComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [CartComponent, CartButtonComponent]
})
export class OrderModule { }
