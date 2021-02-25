import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoresModule } from '../stores/stores.module';
import { NavbarModifierModule } from '../navbar-modifier/navbar-modifier.module';
import { FavouritesComponent } from './pages/favourites/favourites.component';

const routes: Routes = [
  {
    path: ':type',
    component: FavouritesComponent,
  }
]

@NgModule({
  declarations: [FavouritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoresModule,
    NavbarModifierModule
  ]
})
export class FavouriteStoresModule { }
