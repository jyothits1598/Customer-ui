import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreDetailComponent } from './pages/store-detail/store-detail.component';
import { StoreDetailDataService } from './services/store-detail-data.service';
import { StoreCategoryComponent } from './components/store-category/store-category.component';
import { StoreItemCardComponent } from './components/store-item-card/store-item-card.component';
import { TimeAvailabilityModule } from '../time-availability/time-availability.module';
import { StoreHeartModule } from '../store-heart/store-heart.module';
import { StoreItemDetailModule } from '../store-item-detail/store-item-detail.module';
import { LazyImageDirective } from './directives/lazy-image.directive';
import { ShareModule } from '../share/share.module';
import { FacebookLikeCountModule } from '../facebook-like-count/facebook-like-count.module';
import { GoogleRatingModule } from '../google-rating/google-rating.module';
import { OrderModule } from '../order/order.module';
import { StoreDetailsBarComponent } from './components/store-details-bar/store-details-bar.component';

const routes: Routes = [
  {
    path: ':id',
    component: StoreDetailComponent
  }
]

@NgModule({
  declarations: [StoreDetailComponent, StoreCategoryComponent, StoreItemCardComponent, LazyImageDirective, StoreDetailsBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TimeAvailabilityModule, 
    StoreHeartModule,
    StoreItemDetailModule,
    ShareModule,
    OrderModule
  ],
  providers: [StoreDetailDataService]
})
export class StoreDetailModule { }
