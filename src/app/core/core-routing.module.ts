import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnderConstructionComponent } from '../modules/authentication/under-construction/under-construction.component';
import { SampleComponent } from './components/sample/sample.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  { path: 'sample', component: SampleComponent },
  { path: 'restaurants', loadChildren: () => import('src/app/modules/store-detail/store-detail.module').then(m => m.StoreDetailModule) },
  { path: 'profile', canActivate: [IsAuthenticatedGuard], loadChildren: () => import('src/app/modules/user-profile/user-profile.module').then(m => m.UserProfileModule) },
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
        path: 'favourites',
        loadChildren: () => import('src/app/modules/favourite-stores/favourite-stores.module').then(m => m.FavouriteStoresModule)
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
