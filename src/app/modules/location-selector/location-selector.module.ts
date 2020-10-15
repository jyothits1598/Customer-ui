import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';



@NgModule({
  declarations: [LocationSelectorComponent],
  imports: [
    CommonModule
  ],
  exports: [LocationSelectorComponent]
})
export class LocationSelectorModule { }
