import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentModalRef, ModalRef } from 'src/app/core/model/modal';
import { } from 'googlemaps'
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { fromEvent, interval, Observable, Subscription } from 'rxjs';
import { debounce, distinctUntilChanged, finalize, map, switchMap, tap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { UserLocation } from 'src/app/core/model/user-location';

@Component({
  selector: 'location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LocationSearchComponent implements AfterViewInit, OnDestroy {
  suggestions: Array<any>;
  suggestionsLoading: boolean = false;
  @ViewChild('searchInput', { read: ElementRef }) searchInput: ElementRef
  @Output() searchedLocation = new EventEmitter<UserLocation>();

  keyboardSubs: Subscription;

  constructor(public geoLocation: GeoLocationService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.keyboardSubs = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      tap(() => {
        this.suggestionsLoading = true;
      }),
      debounce(() => interval(1000)),
      switchMap((val: string) => { return this.geoLocation.getSuggestions(val).pipe(finalize(() => this.suggestionsLoading = false)) })).subscribe(
        (val: any) => {
          this.suggestions = val;
          console.log('this is the autocomplete suggestions', val)
          setTimeout(() => {
            this.changeDetector.detectChanges();
          }, 0);
        }
      )

  }

  onLocSelect(data) {
    this.geoLocation.getPlaceDetail(data).subscribe(
      (searchedLocation: UserLocation) => this.searchedLocation.emit(searchedLocation)
    )
  }

  ngOnDestroy(): void {
    this.keyboardSubs.unsubscribe();
  }

}
