import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[passwordInput]'
})
export class PasswordInputDirective {

  constructor(public input: ElementRef<unknown>) { }

}
