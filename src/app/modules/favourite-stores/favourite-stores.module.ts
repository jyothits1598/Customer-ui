import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteStoresComponent } from './pages/favourite-stores/favourite-stores.component';
import { RouterModule, Routes } from '@angular/router';
import { StoresModule } from '../stores/stores.module';
import { NavbarModifierModule } from '../navbar-modifier/navbar-modifier.module';

const routes: Routes = [
  {
    path: '',
    component: FavouriteStoresComponent
  }
]

@NgModule({
  declarations: [FavouriteStoresComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoresModule,
    NavbarModifierModule
  ]
})
export class FavouriteStoresModule { }
