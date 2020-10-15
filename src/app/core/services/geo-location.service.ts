import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  constructor(private window: Window) {
    this.getLocation();
  }

  getLocation(): Observable<Position | PositionError> {
    let goeLocation: Geolocation = window.navigator.geolocation;
    return new Observable(observer => {
      goeLocation.getCurrentPosition(
        (success) => { observer.next(success); observer.complete(); },
        (error) => { observer.error(error) },
      );
    });
  }
}
