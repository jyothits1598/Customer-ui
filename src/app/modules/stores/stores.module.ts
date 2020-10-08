import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreCardComponent } from './components/store-card/store-card.component';

@NgModule({
  declarations: [StoreListComponent, StoreCardComponent],
  imports: [
    CommonModule
  ],
  exports: [StoreListComponent],
  providers: []
})
export class StoresModule { }
