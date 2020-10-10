import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreSearchComponent } from './components/store-search/store-search.component';
import { IncrementalSearchModule } from '../incremental-search/incremental-search.module';



@NgModule({
  declarations: [StoreSearchComponent],
  imports: [
    CommonModule,
    IncrementalSearchModule
  ],
  exports: [StoreSearchComponent]
})
export class StoreSearchModule { }
