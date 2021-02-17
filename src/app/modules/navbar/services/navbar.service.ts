import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, combineLatest, merge } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ScrollService } from 'src/app/core/services/scroll.service';
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

  headingTemplate$ = this.headingTemplate.asObservable();
  constructor(private scollService: ScrollService) {}

  setTemplate(temp: TemplateRef<any>) {
    this.headingTemplate.next(temp);
  }
}

enum Direction {
  UP,
  DOWN,
}
