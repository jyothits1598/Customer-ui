import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_StoreDetails } from 'src/api/store-data';
import { URL_StoreCategoryDetails } from 'src/api/store-data';
import { UserLocation, UserLocationToQuery } from 'src/app/core/model/user-location';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { ReadStoreCategories, ReadStoreDetail, StoreCategory, StoreDetail } from '../model/store-detail'
@Injectable()
export class StoreDetailDataService {

  constructor(private restApiService: RestApiService) { }

  storeDetail(storeId: number, location?: UserLocation): Observable<StoreDetail> {
    return this.restApiService.get(
      URL_StoreDetails(storeId) + (location ? UserLocationToQuery(location) : '')
      ).pipe(map(data => ReadStoreDetail(data)));
  }

  getCateoryDetail(storeId:number,menuId:number):Observable<StoreCategory[]>{
    return this.restApiService.get(
      URL_StoreCategoryDetails(storeId,menuId)
      ).pipe(map(data => ReadStoreCategories(storeId,data.categories)));
  }
}
