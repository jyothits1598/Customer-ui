export interface UserLocation {
    latLng: { lat: number, lng: number },
    address: { locality: string, fullAddress: string }
}

export function UserLocationToQuery(loc: UserLocation) {
    return `?lat=${loc.latLng.lat}&lng=${loc.latLng.lng}&distance=20000`;
}