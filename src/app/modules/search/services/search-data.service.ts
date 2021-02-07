import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { debounce, finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { Constants } from 'src/app/core/model/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoresDataService } from '../../stores/services/stores-data.service';

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  storageKey = 'searchHistory';

  searchHistory$ = new BehaviorSubject<string[]>(
    this.storageService.get(this.storageKey) || []
  );

  isLoading$ = new BehaviorSubject<boolean>(false);

  fullSearchTerm$ = new BehaviorSubject<string>('');

  inlineSearchTerm$ = new BehaviorSubject<string>('');
  inlineSearchResults$ = this.inlineSearchTerm$.pipe(
    debounce(() => interval(500)),
    switchMap((searchTerm) => {
      this.isLoading$.next(true);
      return this.restApiService
        .get(
          `api/stores/search?${this.constructQuery(
            searchTerm,
            this.geoLoactionServ.getUserLocation()?.latLng,
            this.authService.loggedUser?.customRadius
          )}`
        )
        .pipe(
          map((result) => result.data.stores || []),
          finalize(() => this.isLoading$.next(false))
        );
    })
  );
  overlayOpen = false;

  constructor(
    private storageService: StorageService,
    private restApiService: RestApiService,
    private geoLoactionServ: GeoLocationService,
    private authService: AuthService,
    private storeDataService: StoresDataService
  ) {}

  searchForTerm(searchTerm: string) {
    const newHistory = [
      searchTerm,
      ...this.searchHistory$.value.filter(
        (val) => val.toUpperCase() !== searchTerm.toUpperCase()
      ),
    ].slice(0, 12);
    this.storageService.store(this.storageKey, newHistory);
    this.searchHistory$.next(newHistory);
  }

  updateInlineSearch(searchTerm: string): void {
    this.inlineSearchTerm$.next(searchTerm);
  }

  updateFullSearch(searchTerm: string): void {
    this.fullSearchTerm$.next(searchTerm);
  }

  clearFullSearch(): void {
    this.fullSearchTerm$.next(undefined);
  }

  constructQuery(
    name: string,
    latLng: { lat: number; lng: number },
    distance: number
  ) {
    let result = 'name=' + name;
    if (latLng)
      result += `&lat=${latLng.lat}&lng=${latLng.lng}&distance=${
        distance ? distance : 5
      }&suggestion=true`;
    return result;
  }
}
