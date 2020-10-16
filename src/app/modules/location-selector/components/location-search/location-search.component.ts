import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalRef } from 'src/app/core/model/modal';
import { GoogleLocationService } from '../../services/google-location.service';

import { } from 'googlemaps'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements AfterViewInit {

  constructor(private googleLocation: GoogleLocationService) { }

  ngAfterViewInit(): void {
    this.googleLocation.getSuggestions("bang").subscribe(console.log);
  }

  @ViewChild('locationSearchInput', { read: ElementRef }) locationInput: ElementRef;
  @ViewChild('randomDiv', { read: ElementRef }) randomDiv: ElementRef;
  @Output() location = new EventEmitter<any>();



  private getPlaceAutocomplete(name: string) {
    
  }

  // var service = new google.maps.places.AutocompleteService();
  //   // console.log('find');
  //   // var request = {
  //   //     name: 'bengalore',
  //   //     type: 'street_address',

  //   // };
  //   // service.nearbySearch(request, (result)=>{console.log('places found, ', result)});
  //   let request: google.maps.places.AutocompletionRequest = {
  //     input: 'bangalore',
  //     componentRestrictions: { country: 'IN' },
  //     types: ['(regions)']
  //   }
  //   service.getPlacePredictions(request, (result) => {
  //     console.log('result from auto complete', result);
  //   })

  // private getPlaceAutocomplete() {
  //   const autocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement,
  //     {
  //       componentRestrictions: { country: 'IN' },
  //       types: ['establishment']  // 'establishment' / 'address' / 'geocode'
  //     });

  //     autocomplete.addListener('')
  //   google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //     const place = autocomplete.getPlace();
  //     // this.invokeEvent(place);
  //     console.log('place changed ', place);
  //   });
  // }

}
