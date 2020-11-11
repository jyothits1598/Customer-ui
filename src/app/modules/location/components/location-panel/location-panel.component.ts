import { Component, OnInit } from '@angular/core';
import { ComponentModalRef } from 'src/app/core/model/modal';
import { ComponentPopoverRef } from 'src/app/core/model/popover';
import { UserLocation } from 'src/app/core/model/user-location';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';

@Component({
  selector: 'app-location-panel',
  templateUrl: './location-panel.component.html',
  styleUrls: ['./location-panel.component.scss']
})
export class LocationPanelComponent implements OnInit {
  locationHistory: Array<UserLocation>;
  constructor(private modalRef: ComponentPopoverRef<LocationPanelComponent>,
    private geoLocation: GeoLocationService) { }

  ngOnInit(): void {
    this.locationHistory = this.geoLocation.locationHistory;
  }

  handleLocation(location: UserLocation, saveToHistory: boolean = false) {
    if (location) {
      this.geoLocation.setLocation(location, saveToHistory);
    }
    this.modalRef.dismiss();
  }

}
