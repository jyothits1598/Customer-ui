export const URL_AllFavourites = 'api/stores/customer/favourites';

export const URL_SetFavourite = 'api/stores/customer/favourite/add';
export const URL_DeleteFavourite = 'api/stores/customer/favourite/delete';

export function URL_StoreDetails(id: number) {
    return `api/customer/stores/${id}/storedata`;
}

export function URL_StoreItemDetail(storeId: number, itemId: number) {
    return `api/customer/stores/${storeId}/${itemId}/modifiers`;
}

export const URL_Cuisinelist = 'api/stores/v1/cuisines';