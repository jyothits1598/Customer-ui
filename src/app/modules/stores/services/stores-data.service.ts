import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {
  URL_AllFavourites,
  URL_SetFavourite,
} from 'src/api/store-data';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { Pagination, StorePagination } from 'src/app/shared/classes/pagination';
import { ReadStore, Store } from '../model/store';
import { StoreFilter } from '../model/StoreFilter';

@Injectable({
  providedIn: 'root',
})
export class StoresDataService {
  private storeListCache = new Map<string, StoreListCacheItem>();

  constructor(private restApiService: RestApiService) { }

  cacheStoreList(key: string, storeListCacheItem: StoreListCacheItem) {
    this.storeListCache.set(key, storeListCacheItem);
  }

  retrieveStoreList(key: string): StoreListCacheItem {
    return this.storeListCache.get(key);
  }

  allStores(filter: StoreFilter, type: 'favItems' | 'favStores' | 'search' = null): Observable<any> {
    let url;
    switch (type) {
      case 'favItems':
        url = 'api/v1/favourites/items'
        break;
      case 'favStores':
        url = 'api/v1/favourites/stores'
        break;
      default:
        url = 'api/v1/stores/search'
        break;
    }
    return this.restApiService.get(
      url + this.filterToQuery(filter)
    );
  }

  setFavourite(storeId: number, isFavourite: boolean) {
    if (isFavourite) return this.restApiService.post(URL_SetFavourite(storeId), {});
    else return this.restApiService.delete(URL_SetFavourite(storeId));
  }

  allFavourites(filter: StoreFilter): Observable<Array<Store>> {
    return this.restApiService
      .get(URL_AllFavourites + this.filterToQuery(filter))
      .pipe(
        map((resp) => {
          let stores: Array<Store> = [];
          resp.data.forEach((s) => {
            let store = ReadStore(s);
            store.isFavourite = true;
            stores.push(store);
          });
          return stores;
        })
      );
  }

  filterToQuery(filter: StoreFilter): string {
    let result = '';
    let sort_by = '';
    if (filter) {
      if (filter.q) result += 'q=' + filter.q;
      if (filter.page) {
        if (result) {
          result += '&';
        }
        result += 'page=' + filter.page;
      }
      if (filter.sort_type) {
        sort_by = '&sort_type=' + filter.sort_type;
      }
      if (filter.location) {
        if (result) {
          result += '&';
        }
        result +=
          `lat=${filter.location.lat}&lon=${filter.location.lng}&distance=${filter.distance ? filter.distance : 5
          }` + sort_by;
      }
      if (filter.cuisine) {
        if (result) {
          result += '&';
        }
        result += 'cuisine=' + filter.cuisine;
      }
    }
    return result ? '?' + result : result;
  }
}

export interface StoreListCacheItem {
  stores: Store[];
  pagination: StorePagination;
  filter: StoreFilter;
  currentPage: number;
}
