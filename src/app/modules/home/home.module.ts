import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { StoresModule } from '../stores/stores.module';
import { RouterModule, Routes } from '@angular/router';
import { NearbyStoresComponent } from '../stores/pages/nearby-stores/nearby-stores.component';
import { FilterCategoriesComponent } from './pages/filter-categories/filter-categories.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: NearbyStoresComponent
      }
    ],
  }
]

@NgModule({
  declarations: [HomeComponent, FilterCategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoresModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
