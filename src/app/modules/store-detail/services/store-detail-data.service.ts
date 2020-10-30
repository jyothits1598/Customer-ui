import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_StoreDetails } from 'src/api/store-data';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { ReadStoreCategories, ReadStoreDetail } from '../../favourite-stores/model/store-detail';

@Injectable()
export class StoreDetailDataService {

  constructor(private restApiService: RestApiService) { }

  storeDetail(){
    return this.restApiService.get(URL_StoreDetails(370)).pipe(map(data => ReadStoreDetail(data)));
  }
}
