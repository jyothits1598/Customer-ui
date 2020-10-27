import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeAvailabilityModule } from '../time-availability/time-availability.module';
import { NearbyStoresComponent } from './pages/nearby-stores/nearby-stores.component';
import { IncrementalSearchModule } from '../incremental-search/incremental-search.module';
import { StoreHeartComponent } from './components/store-heart/store-heart.component';

@NgModule({
  declarations: [StoreListComponent, StoreCardComponent, NearbyStoresComponent, StoreHeartComponent],
  imports: [
    CommonModule,
    SharedModule,
    TimeAvailabilityModule,
    IncrementalSearchModule
  ],
  exports: [NearbyStoresComponent, StoreListComponent],
  providers: []
})
export class StoresModule { }
