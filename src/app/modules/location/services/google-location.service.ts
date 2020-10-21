import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {
  autocomplete: google.maps.places.AutocompleteService;

  constructor(private window: Window) {
    this.autocomplete = new google.maps.places.AutocompleteService();
  }

  getSuggestions(name: string) {
    return new Observable((observer) => {
      let request: google.maps.places.AutocompletionRequest = {
        input: name,
        componentRestrictions: { country: 'IN' },
        types: ['(regions)']
      }
      this.autocomplete.getPlacePredictions(request, (resp, status) => {
        observer.next(resp);
      })
    })
  }

  getUserLocation(): Observable<any> {
    return new Observable(observer => {
      if (this.window.navigator) {
        let options = {
          enableHighAccuracy: true,
        };

        this.window.navigator.geolocation.getCurrentPosition(
          (location: Position) => {
            let req: google.maps.GeocoderRequest = {
              location: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
            }
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode(req, (res) => { console.log('response from reverse goe code', res) })
          },
          (error) => {
            observer.error('Could not get current location')
          },

          options)
      }else observer.error('Platform does not support locations')
    })
  }
}
