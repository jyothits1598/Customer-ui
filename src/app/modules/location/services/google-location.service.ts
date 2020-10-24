import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { UserLocation } from 'src/app/core/model/user-location';

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {
  autocomplete: google.maps.places.AutocompleteService;
  geocoder: google.maps.Geocoder;

  constructor(private window: Window,
    private ngZone: NgZone) {
    this.autocomplete = new google.maps.places.AutocompleteService();
    ngZone.runTask(() => {
      this.autocomplete = new google.maps.places.AutocompleteService();
      this.geocoder = new google.maps.Geocoder();
    })
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
      componentRestrictions: { country: 'AU' },
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
}
