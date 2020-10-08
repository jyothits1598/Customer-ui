export interface Store {
    id: number,
    name: string,
    cuisine: string,
    logo: string,
    address: string,
    description: string,
    googleUrl: string,
    facebookUrl: string,
}

export function readStore(data: any): Store {
    let store: Store = {
        id: data.store_id,
        name: data.store_name,
        cuisine: data.cuisine_name,
        logo: data.store_logo,
        address: data.store_address,
        description: data.description,
        googleUrl: data.google_business_url,
        facebookUrl: data.facebook_url,
    };
    return store;
}