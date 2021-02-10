import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private window: Window) { }

  scrollTo(elem) {
    elem.scrollIntoView({ behavior: "smooth", })
  }

}
