import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, OnInit, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  get isMobile(): boolean {
    return this.window.document.documentElement.clientWidth < 992;
  }

  renderer: Renderer2;

  matcher: MediaQueryList;

  disableScroll() {
    this.renderer.setStyle(window.document.body, 'overflow-y', 'hidden');
  }
  
  resetScroll() {
    this.renderer.setStyle(window.document.body, 'overflow-y', 'auto');
  }

  registerRenderer(r: Renderer2) {
    this.renderer = r;
  }

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