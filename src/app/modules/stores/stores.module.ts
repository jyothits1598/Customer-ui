import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreCardComponent } from './components/store-card/store-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [StoreListComponent, StoreCardComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [StoreListComponent],
  providers: []
})
export class StoresModule { }
