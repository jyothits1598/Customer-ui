import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './pages/cart/cart.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { CartSummaryComponent } from './pages/cart-summary/cart-summary.component';
import { OrderContainerComponent } from './components/order-container/order-container.component';
import { CartContentComponent } from './components/cart-content/cart-content.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';
import { AddPaymentOptionsComponent } from './components/add-payment-options/add-payment-options.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';

// const routes: Routes = [
//   { path: '', component: CartComponent },
// ];

@NgModule({
  declarations: [CartComponent, CartButtonComponent, PaymentComponent, ConfirmationComponent, CartSummaryComponent, OrderContainerComponent, CartContentComponent, PaymentOptionsComponent, AddPaymentOptionsComponent, OrderStatusComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [CartComponent, CartButtonComponent, OrderContainerComponent]
})
export class OrderModule { }
