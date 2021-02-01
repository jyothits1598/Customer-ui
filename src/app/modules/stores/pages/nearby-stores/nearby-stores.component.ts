import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLocation } from 'src/app/core/model/user-location';
import { AuthService } from 'src/app/core/services/auth.service';
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

  constructor(private route: ActivatedRoute, private geoLocation: GeoLocationService, private authService: AuthService) {
    
    this.locationSubs = this.geoLocation.userLocation().subscribe((value: UserLocation) => {
      this.filter = {
        location: value.latLng,
        distance: this.authService.loggedUser?.customRadius ? this.authService.loggedUser.customRadius : 5,
        sort_by: this.route.snapshot.queryParams['type'] ?  this.route.snapshot.queryParams['type'] :''
      }
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.locationSubs.unsubscribe();
  }

}
