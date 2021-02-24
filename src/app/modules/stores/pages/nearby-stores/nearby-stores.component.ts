import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Constants } from 'src/app/core/model/constants';
import { UserLocation } from 'src/app/core/model/user-location';
import { AuthService } from 'src/app/core/services/auth.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { StoreFilter } from '../../model/StoreFilter';

@Component({
  selector: 'nearby-stores',
  templateUrl: './nearby-stores.component.html',
  styleUrls: ['./nearby-stores.component.scss'],
})
export class NearbyStoresComponent implements OnInit, OnDestroy {
  pageKey = Constants.Keys.NearbyStores;

  locationSubs: Subscription;
  filter: StoreFilter = {};

  constructor(
    private geoLocation: GeoLocationService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.locationSubs = combineLatest([this.geoLocation.userLocation(), this.route.queryParams]).subscribe(([u, q]) => {
      this.filter = {
        location: u.latLng,
        distance: this.authService.loggedUser?.radius
          ? this.authService.loggedUser.radius
          : 5,
        ...q
      };
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.locationSubs.unsubscribe();
  }
}
