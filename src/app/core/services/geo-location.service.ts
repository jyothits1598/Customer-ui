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
  autocomplete: google.maps.places.AutocompleteService;
  geocoder: google.maps.Geocoder;
  locationHistory: Array<UserLocation>;

  private userLocation$: BehaviorSubject<UserLocation>;

  constructor(private window: Window,
    private storage: StorageService,
    private ngZone: NgZone) {
    ngZone.runTask(() => {
      this.autocomplete = new google.maps.places.AutocompleteService();
      this.geocoder = new google.maps.Geocoder();
    })

    this.locationHistory = this.storage.get(locationHistoryIdentifier) || [];
    console.log('read location history', this.locationHistory);
    let currentLocation = this.storage.get(currentlocationIdentifier);
    this.userLocation$ = new BehaviorSubject<any>(currentLocation);
  }

  userLocation() {
    return this.userLocation$.asObservable().pipe(filter(value => !!value));
  }

  getUserLocation(): Observable<UserLocation> {
    let goeLocation: Geolocation = this.window.navigator.geolocation;
    return new Observable<UserLocation>(observer => {
      goeLocation.getCurrentPosition(
        (location: Position) => {
          let req: google.maps.GeocoderRequest = {
            location: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
          }
          this.geocoder.geocode(req, (res) => {
            this.ngZone.run(() => {
              observer.next({ latLng: { lat: location.coords.latitude, lng: location.coords.longitude }, address: { locality: this.getLocalityName(res[0]), fullAddress: res[0].formatted_address } })
            })
          })
        },
        (error) => { observer.error(error) },
      );
    });

  }

  getSuggestions(name: string) {
    let request: google.maps.places.AutocompletionRequest = {
      input: name,
      componentRestrictions: { country: 'IN' },
      types: ['geocode']
    }
    if (name) {
      let subject$ = new Subject();
      this.autocomplete.getPlacePredictions(request, (resp, status) => {
        this.ngZone.run(() => {
          subject$.next(resp);
          subject$.complete();
        })
      })
      return subject$.asObservable();
    }
    else return of([])
  }

  getPlaceDetail(data: any): Observable<UserLocation> {
    console.log('inside place details');
    return this.ngZone.runTask(() => {
      return new Observable(observer => {
        let req: google.maps.GeocoderRequest = {
          placeId: data.place_id
        }
        this.geocoder.geocode(req, (res) => {
          this.ngZone.run(() => {
            observer.next(
              {
                latLng: { lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng() },
                address: { locality: data.structured_formatting.main_text, fullAddress: res[0].formatted_address }
              })
            observer.complete();
          })
        })
      });
    })


  }

  getLocalityName(data: any): string {
    let addComps = data.address_components;

    for (let a = 0; a < addComps.length; a++) {
      if (addComps[a].types.includes('sublocality')) return addComps[a].long_name;
    }
    return "";
  }

  setLocation(location: UserLocation, saveToHistory: boolean = false) {

    if (saveToHistory) {
      let index = this.locationHistory.findIndex((pastLocation) => {
        return pastLocation.address.locality === location.address.locality
      });
      console.log('inside set location, index, ', index);
      if (index === -1) this.locationHistory.unshift(location);
      else this.locationHistory[index] = location;

      this.storage.store(locationHistoryIdentifier, this.locationHistory);
    }

    this.storage.store(currentlocationIdentifier, location);
    this.userLocation$.next(location);
  }
}
