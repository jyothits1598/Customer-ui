import { StoreItem } from "src/app/modules/store-detail/model/store-detail";
import { StoreItemDetail } from "src/app/modules/store-item-detail/model/store-item-detail";

export interface CartData {
    storeId: number,
    storeName: string;
    // items: Array<StoreItemDetail>
    items: Array<{ item: StoreItemDetail, quantity: number }>
}

export interface CartDto {
    // cart: {
    store_id: number;
    items: Array<{
        item_id: number,
        item_name: string,
        quantity: number,
        possition: number,
        item_price: string,
        modifiers: Array<{
            modifier_id: number,
            modifier_name: string,
            options: Array<{ option_id: number, name: string, option_price: string }>
        }>
    }>
    // }
}

export function mapToCartData(data: CartDto): CartData {
    return {
        storeId: data.store_id,
        storeName: 'name',
        items: data.items.map((item) => {
            let mod = item.modifiers.map((mod) => {
                return {
                    id: mod.modifier_id,
                    name: mod.modifier_name,
                    minSelection: null,
                    maxSelection: null,
                    freeSelection: null,
                    options: mod.options.map(opt => { return { name: opt.name, id: opt.option_id, price: parseFloat(opt.option_price) } })
                }
            })
            let itemDetail: StoreItemDetail = {
                id: item.item_id,
                name: item.item_name,
                basePrice: parseFloat(item.item_price),
                image: null,
                storeId: data.store_id,
                modifiers: mod
            }
            return {
                quantity: item.quantity,
                item: itemDetail
            }
        })

    }
}

export function MapToDto(data: CartData): CartDto {
    let items = data.items.map(
        (item, index) => {
            let modifiers = item.item.modifiers.map(m => {
                return {
                    modifier_id: m.id,
                    modifier_name: m.name,
                    options: m.options.map(o => { return { option_id: o.id, name: o.name, option_price: o.price.toString() } })
                }
            });
            return {
                item_id: item.item.id,
                item_name: item.item.name,
                item_price: item.item.basePrice.toString(),
                quantity: item.quantity,
                possition: index,
                modifiers: modifiers
            }
        });
    return {
        store_id: data.storeId,
        items: items
    }
}