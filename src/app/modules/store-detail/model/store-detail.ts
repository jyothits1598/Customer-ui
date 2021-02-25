import { StoreItemDetail } from '../../store-item-detail/model/store-item-detail';
import { ReadAvailability, TimeAvailability, FacebookCountConverstion } from '../../time-availability/model/time-availability';

export interface StoreDetail {
    id: number,
    name: string,
    // cuisine: string,
    openingHours: Array<TimeAvailability>
    logo: string,
    storeImage: string;
    address: string,
    distance: string,
    // description: string,
    googleUrl: string,
    facebookUrl: string,
    isFavourite: boolean,
    categories: Array<StoreCategory>
    latLng: { lat: number, lon: number }
    facebookLike: string,
    googleRating: number,
    typeOfCreation: 'Shell' | string,
    menus: Array<StoreMenus>
    status: string,
    phoneNumber: string

}

export interface StoreCategory {
    id: number,
    name: string,
    items: Array<StoreItemDetail>
}

export interface StoreMenus {
    id: number,
    isCustomAvailability: boolean,
    name: string
}

export interface StoreItem {
    id: number,
    name: string,
    basePrice: number,
    image: string,
    storeId: number,
    isFavourite?: boolean
    // modifiers : Array<ItemModifier>
}

export interface ItemModifier {
    id: number;
    name: string;
    minSelection: number;
    maxSelection: number;
    freeSelection: number;
    storeId: number;
    options: Array<ModifierOption>;
}
export interface ModifierOption {
    id: number;
    name: string;
    price: number;
    storeId: number;
}
export function ReadStoreDetail(resp: any): StoreDetail {
    let data = resp;
    let categories = ReadStoreCategories(resp.id, data.categories);
    let menus = ReadStoreMenus(resp.id, data.menus);

    return {
        id: data.id,
        name: data.name,
        // cuisine: data.cuisine_name,
        openingHours: ReadAvailability(data.opening_hours),
        logo: data.logo,
        storeImage: data.picture,
        address: data.address,
        distance: data.distance,
        // description: data.description,
        googleUrl: data.google_business_url,
        facebookUrl: data.facebook_url,
        isFavourite: data.is_favourite ? true : false,
        categories: categories,
        latLng: { lat: data.location.lat, lon: data.location.lon },
        facebookLike: data.facebook_like ? FacebookCountConverstion(data.facebook_like) : 0,
        googleRating:parseFloat(data.google_rating) ? parseFloat(data.google_rating) : 0,
        typeOfCreation: data.creation_type,
        menus: menus,
        status: data.status,
        phoneNumber: data.phone_number
    };
}

export function ReadStoreCategories(storeId: number, catData: any): Array<StoreCategory> {
    let cats: Array<StoreCategory> = [];
    catData.forEach((c) => {
        cats.push({ id: c.id, name: c.name, items: ReadStoreItems(storeId, c.items) })
    })
    return cats;
}

export function ReadStoreMenus(storeId: number, menuData: any): Array<StoreMenus> {
    let menus: Array<StoreMenus> = [];
    menuData.forEach((m) => {
        menus.push({ id: m.id, name: m.name, isCustomAvailability: m.is_custom_availability })
    })
    return menus;
}

export function ReadStoreItems(storeId: number, data: any): Array<StoreItemDetail> {
    let items: Array<StoreItemDetail> = [];
    data.forEach((i) => {
        items.push({
            id: i.id,
            name: i.name,
            basePrice: i.price,
            image: i.picture,
            storeId: storeId,
            modifiers: ReadItemModifiers(storeId, i.modifiers),
            isFavourite: i.is_favourite
        })
    })
    return items;
}

export function ReadItemModifiers(storeId: number, data: any): Array<ItemModifier> {
    let result: Array<ItemModifier> = [];
    data.forEach(m => {
        result.push({
            id: m.id,
            name: m.name,
            minSelection: m.minimum,
            maxSelection: m.maximum,
            freeSelection: m.free,
            storeId: storeId,
            options: ReadModifierOptions(storeId, m.options)
        })
    });
    return result;
}

export function ReadModifierOptions(storeId: number, data: any): Array<ModifierOption> {
    let result: Array<ModifierOption> = [];
    data.forEach(o => {
        result.push({
            id: o.id,
            name: o.name,
            price: parseFloat(o.price),
            storeId: storeId,
        })
    })
    return result;
}