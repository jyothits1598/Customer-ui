export interface StoreFilter{
    page?: number,
    name?: string,
    location?: {lat: number, long: number},
    distance?: number,
}