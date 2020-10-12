import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeAvailabilityModule } from '../time-availability/time-availability.module';
import { NearbyStoresComponent } from './pages/nearby-stores/nearby-stores.component';
import { StoreSearchComponent } from './components/store-search/store-search.component';
import { IncrementalSearchModule } from '../incremental-search/incremental-search.module';

@NgModule({
  declarations: [StoreListComponent, StoreCardComponent,StoreSearchComponent, NearbyStoresComponent],
  imports: [
    CommonModule,
    SharedModule,
    TimeAvailabilityModule,
    IncrementalSearchModule
  ],
  exports: [NearbyStoresComponent, StoreSearchComponent],
  providers: []
})
export class StoresModule { }
