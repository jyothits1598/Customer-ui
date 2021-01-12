import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { NativeElementInjectorDirective } from 'ngx-intl-tel-input';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLocation } from 'src/app/core/model/user-location';
import { AuthService } from 'src/app/core/services/auth.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { StoreFilter } from '../../stores/model/StoreFilter';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService implements OnDestroy {
  storageKey = 'searchHistory'
  searchHistory: Array<string>;
  searchInputElem: ElementRef;

  locationSubs: Subscription;
  filter: StoreFilter

  constructor(
    private storageService: StorageService,
    private goeLocationServ: GeoLocationService,
    private authService: AuthService,
    private restApiService: RestApiService
  ) {
    this.searchHistory = this.storageService.get(this.storageKey) || [];
    this.locationSubs = this.goeLocationServ.userLocation().subscribe(
      (value: UserLocation) => {
        this.filter = {
          location: value.latLng,
          distance: this.authService.loggedUser?.customRadius ? this.authService.loggedUser.customRadius : 5
        }
      }
    )
  }

  // this.locationSubs = this.geoLocation.userLocation().subscribe((value: UserLocation) => {
  //   this.filter = {
  //     location: value.latLng,
  //     distance: this.authService.loggedUser?.customRadius ? this.authService.loggedUser.customRadius : 5
  //   }
  // });

  ngOnDestroy() {
    //TODO complete unsub logic

  }

  getHistory() {
    return this.searchHistory;
  }


  search(name: string): Observable<any> {
    let q: StoreFilter = { ...this.filter };
    q.name = name;
    return this.restApiService.get('api/stores/search' + this.filterToQuery(q)).pipe(map((resp) => resp.data.stores || []));
  }
  addItem(searchTerm: string) {
    if (!this.searchHistory.includes(searchTerm)) {
      if (this.searchHistory.length < 3) this.searchHistory.unshift(searchTerm);
      else this.searchHistory = [searchTerm, ...this.searchHistory.splice(1, 2)]
      this.storageService.store(this.storageKey, this.searchHistory);
    }

  }

  registerSearchElement(elem: ElementRef) {
    this.searchInputElem = elem;
  }

  clearSearch() {
    if (this.searchInputElem) this.searchInputElem.nativeElement.value = '';
  }

  filterToQuery(filter: StoreFilter): string {
    let result = '';
    if (filter) {
      if (filter.name) result += ('name=' + filter.name);
      if (filter.page) {
        if (result) {
          result += '&'
        }
        result += ('page=' + filter.page)
      }
      if (filter.location) {
        if (result) {
          result += '&';
        }
        result += (`lat=${filter.location.lat}&lng=${filter.location.lng}&distance=${filter.distance ? filter.distance : 5}`)
      }
    }
    return result ? ('?' + result) : result;
  }

}
