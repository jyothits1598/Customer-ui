import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  value: string;
  headingTemplate: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject(
    null
  );

  headingTemplate$ = this.headingTemplate.asObservable();
  constructor() {}

  setTemplate(temp: TemplateRef<any>) {
    this.headingTemplate.next(temp);
  }
}
