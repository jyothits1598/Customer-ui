import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeAvailabilityModule } from '../time-availability/time-availability.module';

@NgModule({
  declarations: [StoreListComponent, StoreCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    TimeAvailabilityModule
  ],
  exports: [StoreListComponent],
  providers: []
})
export class StoresModule { }
