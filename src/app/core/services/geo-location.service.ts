import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserLocation } from '../model/user-location';
import { StorageService } from './storage.service';

const locationHistoryIdentifier: string = 'locationHistory'
const currentlocationIdentifier: string = 'currentLocation'

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  autocomplete: google.maps.places.AutocompleteService;
  geocoder = new google.maps.Geocoder();
  locationHistory: Array<UserLocation>;

  userLocation$;
  constructor(private window: Window,
    private storage: StorageService) {
    this.autocomplete = new google.maps.places.AutocompleteService();
    this.locationHistory = this.storage.get(locationHistoryIdentifier) || [];
    let currentLocation = this.storage.get(currentlocationIdentifier);
    this.userLocation$ = new BehaviorSubject<any>(currentLocation);
  }

  getUserLocation(): Observable<UserLocation> {
    let goeLocation: Geolocation = this.window.navigator.geolocation;
    return new Observable(observer => {
      goeLocation.getCurrentPosition(
        (location: Position) => {
          let req: google.maps.GeocoderRequest = {
            location: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
          }

          this.geocoder.geocode(req, (res) => {
            observer.next({ latLng: { lat: location.coords.latitude, lng: location.coords.longitude }, address: { locality: this.getLocalityName(res[0]), fullAddress: res[0].formatted_address } })
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
        subject$.next(resp);
        subject$.complete();
      })
      return subject$.asObservable();
    }
    else return of([])
  }

  getPlaceDetail(data: any) {
    return new Observable(observer => {

      let req: google.maps.GeocoderRequest = {
        placeId: data.place_id
      }

      this.geocoder.geocode(req, (res) => {
        observer.next(
          {
            latlong: { lat: res[0].geometry.location.lat(), lng: res[0].geometry.location.lng() },
            address: { locality: data.structured_formatting.main_text, fullAddress: res[0].formatted_address }
          })
        observer.complete();
      })
    });
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
      this.locationHistory.unshift(location);
      this.storage.store(locationHistoryIdentifier, this.locationHistory);
    }

    this.storage.store(currentlocationIdentifier, location);
    this.userLocation$.next(location);
  }
}
