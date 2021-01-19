import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';

@NgModule({
  declarations: [CartComponent, CartButtonComponent, PaymentComponent, ConfirmationComponent, CartSummaryComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [CartComponent, CartButtonComponent]
})
export class OrderModule { }
