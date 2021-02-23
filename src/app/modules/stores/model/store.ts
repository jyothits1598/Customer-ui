import { ReadAvailability, TimeAvailability, FacebookCountConverstion } from '../../time-availability/model/time-availability';

export interface Store {
    id: number,
    name: string,
    creationType: string;
    cuisine: string,
    openingHours: Array<TimeAvailability>
    logo: string,
    storeImage:string,
    address: string,
    distance: string;
    description: string,
    googleUrl: string,
    // facebookUrl: string,
    isFavourite: boolean,
    latLng: { lat: number, lon: number }
    facebookLike:string,
    googleRating:number
}

export function ReadStore(data: any): Store {
    return {
        id: data.id,
        name: data.name,
        creationType: data.creation_type,
        cuisine: data.cuisine_name,
        openingHours: ReadAvailability(data.opening_hours),
        logo: data.store_logo,
        storeImage: data.store_image,
        address: data.store_address,
        distance: data.distance,
        description: data.description,
        googleUrl: data.google_business_url,
        // facebookUrl: data.facebook_url,
        latLng: { lat: data.latitude, lon: data.longitude },
        isFavourite: data.is_favourite ? true : false,
        facebookLike:data.facebook_like ? FacebookCountConverstion(data.facebook_like) : 0,
        googleRating:parseFloat(data.google_rating) ? parseFloat(data.google_rating) : 0
    };
}