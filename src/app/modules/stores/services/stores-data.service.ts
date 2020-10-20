import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { Pagination, StorePagination } from 'src/app/shared/classes/pagination';
import { Store } from '../model/store';
import { StoreFilter } from '../model/StoreFilter';

@Injectable({
  providedIn: 'root'
})
export class StoresDataService {
  constructor(private restApiService: RestApiService) {
  }

  allStores(filter: StoreFilter): Observable<StorePagination> {
    return this.restApiService.get('api/stores/search' + this.filterToQuery(filter));
  }

  filterToQuery(filter: StoreFilter): string {
    let result = '';
    if (filter) {
      console.log(filter);
      if (filter.name) result += ('name=' + filter.name);
      // if (filter.page) result += ('page=' + filter.page);
      if (filter.page) {
        if (result) {
          result += '&'
        }
        result += ('page=' + filter.page)
      }
    }
    return result ? ('?' + result) : result;
  }

}
