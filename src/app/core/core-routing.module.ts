import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreDetailsComponent } from '../modules/stores/components/store-details/store-details.component';
import { StoreFavouritesComponent } from '../modules/stores/components/store-favourites/store-favourites.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  { path: 'store-details', component: StoreDetailsComponent },
  { path: 'verify', loadChildren: () => import('src/app/modules/authentication/user-verification/user-verification.module').then(m => m.UserVerificationModule) },
  { path: 'forgot-password', loadChildren: () => import('src/app/modules/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'reset-password', loadChildren: () => import('src/app/modules/authentication/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'signup', loadChildren: () => import('src/app/modules/authentication/signup/signup.module').then(m => m.SignupModule) },
  { path: 'signin', loadChildren: () => import('src/app/modules/authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'search',
        loadChildren: () => import('src/app/modules/search/search.module').then(m => m.SearchModule)
      },
      {
        path: 'favourites', component: StoreFavouritesComponent
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
