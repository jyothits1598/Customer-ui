import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserLocation } from 'src/app/core/model/user-location';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { StoreFilter } from '../../model/StoreFilter';

@Component({
  selector: 'nearby-stores',
  templateUrl: './nearby-stores.component.html',
  styleUrls: ['./nearby-stores.component.scss']
})
export class NearbyStoresComponent implements OnInit, OnDestroy {
  locationSubs: Subscription;
  filter: StoreFilter = {};

  constructor(private geoLocation: GeoLocationService) {
    this.locationSubs = this.geoLocation.userLocation().subscribe((value: UserLocation) => {
      this.filter = {
        location: value.latLng
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.locationSubs.unsubscribe();
  }

}
