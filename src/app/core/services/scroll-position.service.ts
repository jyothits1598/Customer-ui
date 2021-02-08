import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionService {
  private map = new Map<string, number[]>();

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  storePositionFor(key: string) {
    const pos = this.viewportScroller.getScrollPosition();
    console.log(
      'ScrollPositionService.storePositionFor: key: ',
      key,
      ' @ ',
      pos
    );
    this.map.set(key, pos);
  }

  repositionFor(key: string) {
    const pos = this.map.get(key);
    if (pos) {
      this.viewportScroller.scrollToPosition([pos[0], pos[1]]);
    } else {
      this.scrollToTop();
    }
  }
}
