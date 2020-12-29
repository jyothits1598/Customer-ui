import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  get isMobile(): boolean {
    return this.window.document.documentElement.clientWidth < 500;
  }

  matcher: MediaQueryList;

  constructor(private window: Window) {
    // this.matcher = this.mediaMatcher.matchMedia('(min-width: 500px)');
    // if (!this.matcher.matches) {
    //   this.isMobile = true;
    // } else {
    //   this.isMobile = false;
    // }

    //   this.matcher.addEventListener('change', (event) => {
    //     if (!event.matches) {
    //       this.isMobile = true;
    //     }
    //     else {
    //       this.isMobile = false;
    //     }
    //   });
  }

}