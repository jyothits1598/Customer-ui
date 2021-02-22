import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private _scrollY$ = new BehaviorSubject<number>(0);
  scrollY$ = this._scrollY$.asObservable();

  constructor(private window: Window) {
    window.addEventListener(
      'scroll',
      (event) => this._scrollY$.next(window.pageYOffset),
      true
    );
  }

  scrollTo(elem) {
    elem.scrollIntoView({ behavior: 'smooth' });
  }
}
