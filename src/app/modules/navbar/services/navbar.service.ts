import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fileURLToPath } from 'url';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  value: string;
  headingTemplate: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject(
    null
  );

  private lastPinnedYPos = 0;
  dynamicPosition$ = new BehaviorSubject<object>({
    top: `${this.lastPinnedYPos}px`,
  });

  headingTemplate$ = this.headingTemplate.asObservable();
  constructor() {}

  setTemplate(temp: TemplateRef<any>) {
    this.headingTemplate.next(temp);
  }

  setNavbarPosition(yPos: number) {
    this.dynamicPosition$.next({
      top: `-${yPos - this.lastPinnedYPos}px`,
    });
  }

  pinNavbarPosition(yPos: number) {
    this.dynamicPosition$.next({ top: '0px', transition: 'top 0.2s' });
    this.lastPinnedYPos = yPos;
  }
}
