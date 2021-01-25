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

  itemDetail(storeId: number, itemId: number) {
    return this.restApiService.get(URL_StoreItemDetail(storeId, itemId)).pipe(map((resp: any) => {
      let data = resp.data[0];
      let result: StoreItemDetail = <StoreItemDetail>{};
      result.id = data.item_id;
      result.name = data.item_name;
      result.image = data.item_image;
      result.basePrice = parseFloat(data.item_base_price);  
      result.modifiers = ReadItemModifiers(data.modifiers_details);
      return result;
    }));
  }
}
