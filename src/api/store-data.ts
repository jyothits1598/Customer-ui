export const URL_AllFavourites = 'api/v1/favourites/stores';

export function URL_SetFavourite(id: number) {
    return `api/v1/favourites/stores/${id}`;
} 

export function URL_StoreDetails(id: number) {
    return `api/v1/stores/${id}`;
}

export function URL_StoreCategoryDetails(store_id: number, menu_id: number) {
    return `api/v1/stores/${store_id}/menus/${menu_id}/overview`;
}

export function URL_StoreItemDetail(storeId: number, itemId: number) {
    return `api/customer/stores/${storeId}/${itemId}/modifiers`;
}

export const URL_Cuisinelist = 'api/v1/cuisines';
