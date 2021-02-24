export interface StoreFilter{
    page?: number,
    q?: string,
    location?: {lat: number, lng: number},
    distance?: number,
    sort_type?: string,
    cuisine?: string
}