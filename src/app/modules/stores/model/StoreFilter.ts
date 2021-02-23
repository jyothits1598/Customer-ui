export interface StoreFilter{
    page?: number,
    q?: string,
    location?: {lat: number, lng: number},
    distance?: number,
    sort_by?: string,
    sort_type?: string
}