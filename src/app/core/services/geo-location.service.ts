import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserLocation } from '../model/user-location';
import { StorageService } from './storage.service';

const locationHistoryIdentifier: string = 'locationHistory'
const currentlocationIdentifier: string = 'currentLocation'

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  locationHistory: Array<UserLocation>;

  private userLocation$: BehaviorSubject<UserLocation>;

  constructor(private storage: StorageService,
  ) {
    this.locationHistory = this.storage.get(locationHistoryIdentifier) || [];
    let locat = this.storage.get(currentlocationIdentifier);

    let currentLocation = this.storage.get(currentlocationIdentifier) || {
      address: { locality: "Bangalore", fullAddress: "Bengaluru, Karnataka, India" },
      latLng: { lat: 12.9715987, lng: 77.5945627 }
    };
    this.userLocation$ = new BehaviorSubject<any>(currentLocation);
  }

  userLocation() {
    return this.userLocation$.asObservable().pipe(filter(value => !!value));
  }

  setLocation(location: UserLocation, saveToHistory: boolean = false) {

    if (saveToHistory) {
      let index = this.locationHistory.findIndex((pastLocation) => {
        return pastLocation.address.locality === location.address.locality
      });
      if (index === -1) {
        this.locationHistory.unshift(location);
        if (this.locationHistory.length > 4) this.locationHistory.pop();
      }
      else this.locationHistory[index] = location;

      this.storage.store(locationHistoryIdentifier, this.locationHistory);
    }

    this.storage.store(currentlocationIdentifier, location);
    this.userLocation$.next(location);
  }
}
