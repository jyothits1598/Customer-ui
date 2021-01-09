import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarHeadingContentDirective } from './directives/navbar-heading-content.directive';



@NgModule({
  declarations: [NavbarHeadingContentDirective],
  imports: [
    CommonModule
  ],
  exports: [NavbarHeadingContentDirective]
})
export class NavbarModifierModule { }
