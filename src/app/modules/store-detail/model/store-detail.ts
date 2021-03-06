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
    latLng: { lat: number, lng: number }
    facebookLike: string,
    googleRating: string,
    typeOfCreation: 'Store shell' | string;

}

export interface StoreCategory {
    id: number,
    name: string,
    items: Array<StoreItem>
}

export interface StoreItem {
    id: number,
    name: string,
    basePrice: number,
    image: string,
    storeId: number
}

export function ReadStoreDetail(resp: any): StoreDetail {
    let data = resp.data;
    let categories = ReadStoreCategories(resp.store_id, data.category_details);

    return {
        id: data.store_id,
        name: data.store_name,
        // cuisine: data.cuisine_name,
        openingHours: ReadAvailability(data.opening_hours),
        logo: data.store_logo,
        storeImage: data.store_image,
        address: data.store_address,
        distance: data.distance,
        // description: data.description,
        googleUrl: data.google_business_url,
        facebookUrl: data.facebook_url,
        isFavourite: data.is_favourite ? true : false,
        categories: categories,
        latLng: { lat: data.latitude, lng: data.longitude },
        facebookLike: data.facebook_like ? FacebookCountConverstion(data.facebook_like) : 0,
        googleRating: data.google_rating ? data.google_rating : 0,
        typeOfCreation: data.type_of_creation
    };
}

export function ReadStoreCategories(storeId: number, catData: any): Array<StoreCategory> {
    let cats: Array<StoreCategory> = [];
    catData.forEach((c) => {
        cats.push({ id: c.category_id, name: c.category_name, items: ReadStoreItems(storeId, c.item_details) })
    })
    return cats;
}

export function ReadStoreItems(storeId: number, data: any): Array<StoreItem> {
    let items: Array<StoreItem> = [];
    data.forEach((i) => {
        items.push({ id: i.item_id, 
            name: i.item_name, 
            basePrice: i.item_base_price, 
            image: i.item_image, 
            storeId: storeId })
    })
    return items;
}