import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password/password.component';
import { PasswordInputDirective } from './directives/password-input.directive';



@NgModule({
  declarations: [PasswordComponent, PasswordInputDirective],
  imports: [
    CommonModule
  ],
  exports: [
    PasswordComponent, PasswordInputDirective
  ]
})
export class PasswordHelperModule { }
