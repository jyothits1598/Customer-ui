import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderConstructionComponent } from '../modules/authentication/under-construction/under-construction.component';
import { SampleComponent } from './components/sample/sample.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { TermsServiceComponent } from 'src/app/modules/terms-service/terms-service.component';
import { PrivacyPolicyComponent } from '../modules/privacy-policy/privacy-policy.component';
import { CartComponent } from '../modules/order/pages/cart/cart.component';
import { PaymentComponent } from '../modules/order/pages/payment/payment.component';
import { ConfirmationComponent } from '../modules/order/pages/confirmation/confirmation.component';
import { CartSummaryComponent } from '../modules/order/pages/cart-summary/cart-summary.component';
import { OrderContainerComponent } from '../modules/order/components/order-container/order-container.component';
import { AddPaymentOptionsComponent } from '../modules/order/components/add-payment-options/add-payment-options.component';
import { OrdersGuard } from './guards/orders.guard';

const routes: Routes = [
  { path: 'sample', component: SampleComponent },
  { path: 'restaurants', loadChildren: () => import('src/app/modules/store-detail/store-detail.module').then(m => m.StoreDetailModule) },

  {
    path: 'auth', loadChildren: () => import('src/app/modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'verify', loadChildren: () => import('src/app/modules/authentication/user-verification/user-verification.module').then(m => m.UserVerificationModule)
  },
  {
    path: 'under-construction', component: UnderConstructionComponent
  },
  {
    path: 'terms-service', component: TermsServiceComponent
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule),
        data: { reuseRoute: true, key: 'home-module' }
      },
      {
        path: 'search',
        loadChildren: () => import('src/app/modules/search/search.module').then(m => m.SearchModule),
        data: { reuseRoute: true, key: 'search-module' }
      },
      {
        path: 'favourites',
        loadChildren: () => import('src/app/modules/favourite-stores/favourite-stores.module').then(m => m.FavouriteStoresModule)
      },
      {
        path: 'profile',
        canActivate: [IsAuthenticatedGuard],
        loadChildren: () => import('src/app/modules/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'status',
    component: OrderContainerComponent,
    outlet: 'order',
  },
  {
    path: 'cart',
    component: CartComponent,
    outlet: 'order',
  },
  {
    path: 'cart-summary',
    component: CartSummaryComponent,
    outlet: 'order',
    canActivate: [OrdersGuard]
  },
  {
    path: 'add-payment-opt',
    component: AddPaymentOptionsComponent,
    outlet: 'order'
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
    outlet: 'order'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
