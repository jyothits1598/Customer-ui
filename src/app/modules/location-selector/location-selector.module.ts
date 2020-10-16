import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';



@NgModule({
  declarations: [LocationSelectorComponent, LocationSearchComponent],
  imports: [
    CommonModule
  ],
  exports: [LocationSelectorComponent]
})
export class LocationSelectorModule { }
