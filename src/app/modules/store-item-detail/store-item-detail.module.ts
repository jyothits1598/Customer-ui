import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailContainerComponent } from './components/item-detail-container/item-detail-container.component';
import { StoreItemDetailComponent } from './components/store-item-detail/store-item-detail.component';



@NgModule({
  declarations: [ItemDetailContainerComponent, StoreItemDetailComponent],
  imports: [
    CommonModule
  ],
  exports: [ItemDetailContainerComponent]
})
export class StoreItemDetailModule { }
