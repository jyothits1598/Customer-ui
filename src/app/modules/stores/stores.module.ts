import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeAvailabilityModule } from '../time-availability/time-availability.module';
import { NearbyStoresComponent } from './pages/nearby-stores/nearby-stores.component';
import { IncrementalSearchModule } from '../incremental-search/incremental-search.module';
import { StoreFavouritesComponent } from './components/store-favourites/store-favourites.component';
import { StoreHeartModule } from '../store-heart/store-heart.module';
import { RouterModule } from '@angular/router';
import { GoogleRatingModule } from '../google-rating/google-rating.module';
import { FacebookLikeCountModule } from '../facebook-like-count/facebook-like-count.module';

@NgModule({
  declarations: [StoreListComponent, StoreCardComponent, NearbyStoresComponent, StoreFavouritesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TimeAvailabilityModule,
    IncrementalSearchModule,
    StoreHeartModule,
    GoogleRatingModule,
    FacebookLikeCountModule
  ],
  exports: [NearbyStoresComponent, StoreListComponent, StoreCardComponent],
  providers: []
})
export class StoresModule { }
