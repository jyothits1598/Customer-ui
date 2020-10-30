import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreDetailComponent } from './pages/store-detail/store-detail.component';
import { StoreDetailDataService } from './services/store-detail-data.service';
import { StoreCategoryComponent } from './components/store-category/store-category.component';
import { StoreItemCardComponent } from './components/store-item-card/store-item-card.component';
import { TimeAvailabilityModule } from '../time-availability/time-availability.module';
import { StoreHeartModule } from '../store-heart/store-heart.module';

const routes: Routes = [
  {
    path: ':id',
    component: StoreDetailComponent
  }
]

@NgModule({
  declarations: [StoreDetailComponent, StoreCategoryComponent, StoreItemCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TimeAvailabilityModule, 
    StoreHeartModule
  ],
  providers: [StoreDetailDataService]
})
export class StoreDetailModule { }
