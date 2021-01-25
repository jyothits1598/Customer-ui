export interface StoreFilter{
    page?: number,
    name?: string,
    location?: {lat: number, lng: number},
    distance?: number,
    sort_by?: string
}