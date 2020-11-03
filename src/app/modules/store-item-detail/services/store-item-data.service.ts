import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_StoreItemDetail } from 'src/api/store-data';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { StoreItem } from '../../store-detail/model/store-detail';
import { ReadItemModifiers, StoreItemDetail } from '../model/store-item-detail';

@Injectable({
  providedIn: 'root'
})
export class StoreItemDataService {

  constructor(private restApiService: RestApiService) { }

  itemDetail(item: StoreItem) {
    return this.restApiService.get(URL_StoreItemDetail(item.storeId, item.id)).pipe(map((resp: any) => {
      let result: StoreItemDetail = <StoreItemDetail>{ ...item };
      result.modifiers = ReadItemModifiers(resp.data);
      return result;
    }));
  }
}
