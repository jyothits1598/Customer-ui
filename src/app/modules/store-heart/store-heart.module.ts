import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreHeartComponent } from './components/store-heart/store-heart.component';



@NgModule({
  declarations: [StoreHeartComponent],
  imports: [
    CommonModule
  ],
  exports: [StoreHeartComponent]
})
export class StoreHeartModule { }
