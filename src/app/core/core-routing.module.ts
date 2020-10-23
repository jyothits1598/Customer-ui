import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreDetailsComponent } from '../modules/stores/components/store-details/store-details.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  { path: 'store-details', component: StoreDetailsComponent },
  { path: 'verify', loadChildren: () => import('src/app/modules/user-verification/user-verification.module').then(m => m.UserVerificationModule) },
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
        path: 'signup',
        loadChildren: () => import('src/app/modules/signup/signup.module').then(m => m.SignupModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('src/app/modules/login/login.module').then(m => m.LoginModule)
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
