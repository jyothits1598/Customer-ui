import { StoreItem } from "src/app/modules/store-detail/model/store-detail";
import { StoreItemDetail } from "src/app/modules/store-item-detail/model/store-item-detail";

export interface CartData{
    storeId: number,
    storeName:  string;
    items: Array<StoreItemDetail>
}