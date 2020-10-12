import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor() {
    console.log('inside geo location service: ',  navigator)
    this.getLocation();
  }

  getLocation(): void {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const longitude = position.coords.longitude;
  //       const latitude = position.coords.latitude;
  //       console.log('got location, ', longitude, latitude)
  //     });
  //   } else {
  //     console.log("No support for geolocation")
  //   }
  }
}
