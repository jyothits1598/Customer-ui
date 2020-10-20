import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { UserCurrentLocationComponent } from './components/user-current-location/user-current-location.component';
import { IncrementalSearchModule } from '../incremental-search/incremental-search.module';
import { LocationPanelComponent } from './components/location-panel/location-panel.component';

@NgModule({
  declarations: [LocationSelectorComponent, LocationSearchComponent, UserCurrentLocationComponent, LocationPanelComponent],
  imports: [
    CommonModule,
    IncrementalSearchModule
  ],
  exports: [LocationSelectorComponent]
})
export class LocationModule { }
