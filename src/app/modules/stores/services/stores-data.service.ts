import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { Pagination } from 'src/app/shared/classes/pagination';
import { Store } from '../model/store';

@Injectable({
  providedIn: 'root'
})
export class StoresDataService {
  constructor(private restApiService: RestApiService) { }

  allStores(query: string = null): Observable<any>{
    return this.restApiService.get('api/stores/search' + (query? query : ''));
  }

}
