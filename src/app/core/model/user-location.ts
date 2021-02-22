export interface UserLocation {
    latLng: { lat: number, lon: number },
    address: { locality: string, fullAddress: string }
}

export function UserLocationToQuery(loc: UserLocation) {
    return `?lat=${loc.latLng.lat}&lon=${loc.latLng.lon}&distance=20000`;
}