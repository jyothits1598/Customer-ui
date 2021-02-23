export const URL_AllFavourites = 'api/stores/customer/favourites';

export const URL_SetFavourite = 'api/stores/customer/favourite/add';
export const URL_DeleteFavourite = 'api/stores/customer/favourite/delete';

export function URL_StoreDetails(id: number) {
    return `api/v1/stores/${id}`;
}

export function URL_StoreCategoryDetails(store_id: number,menu_id: number){
    return `api/v1/stores/${store_id}/menus/${menu_id}/overview`;
}

export function URL_StoreItemDetail(storeId: number, itemId: number) {
    return `api/customer/stores/${storeId}/${itemId}/modifiers`;
}

export const URL_Cuisinelist = 'api/v1/cuisines';