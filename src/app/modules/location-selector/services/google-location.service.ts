import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {
  autocomplete: google.maps.places.AutocompleteService;

  constructor() {
    this.autocomplete = new google.maps.places.AutocompleteService();
  }

  getSuggestions(name: string) {
    return new Observable((observer)=>{
      let request: google.maps.places.AutocompletionRequest = {
        input: name,
        componentRestrictions: { country: 'IN' },
        types: ['(regions)']
      }
      this.autocomplete.getPlacePredictions(request, (resp, status)=>{
        observer.next(resp);
      })
    })
  }
}
