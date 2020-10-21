export interface UserLocation {
    latLng: { lat: number, lng: number },
    address: { locality: string, fullAddress: string }
}