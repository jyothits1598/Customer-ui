import { ReadAvailability, TimeAvailability } from '../../time-availability/model/time-availability';

export interface Store {
    id: number,
    name: string,
    cuisine: string,
    openingHours: Array<TimeAvailability>
    logo: string,
    address: string,
    distance: string;
    description: string,
    googleUrl: string,
    facebookUrl: string,
    isFavourite: boolean,
}

export function ReadStore(data: any): Store {
    return {
        id: data.store_id,
        name: data.store_name,
        cuisine: data.cuisine_name,
        openingHours: ReadAvailability(data.opening_hours),
        logo: data.store_logo,
        address: data.store_address,
        distance: data.distance,
        description: data.description,
        googleUrl: data.google_business_url,
        facebookUrl: data.facebook_url,
        isFavourite: data.is_favourite ? true : false
    };
}