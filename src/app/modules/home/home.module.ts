import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { StoresModule } from '../stores/stores.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from '../stores/components/store-list/store-list.component';
import { StoreSearchModule } from '../store-search/store-search.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: StoreListComponent
      }
    ],

  }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    StoresModule,
    StoreSearchModule,
    RouterModule.forChild(routes)
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
