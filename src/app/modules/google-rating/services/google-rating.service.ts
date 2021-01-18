import { Injectable, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleRatingService {

  placeService: google.maps.places.PlacesService;
  constructor(private rendererFactory: RendererFactory2, private ngZone: NgZone) {
    this.placeService = new google.maps.places.PlacesService(
      this.rendererFactory.createRenderer(null, null).createElement('div'));
  }

  getRating(name: string, address: string): Observable<number> {
    return new Observable(
      (observer) => {
        this.placeService.textSearch({ query: `${name}, ${address}` }, (resp) => {
          this.ngZone.run(() => {
            if (resp?.length === 1 && resp[0].rating) {
              observer.next(resp[0].rating);
              observer.complete();
            } else { observer.next(null) }
          }, this)
        })
      }
    )
  }
}
