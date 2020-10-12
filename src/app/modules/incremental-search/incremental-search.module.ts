import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementalSearchComponent } from './components/incremental-search/incremental-search.component';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [IncrementalSearchComponent, FilterPipe],
  imports: [
    CommonModule
  ],
  exports: [IncrementalSearchComponent]
})
export class IncrementalSearchModule { }
