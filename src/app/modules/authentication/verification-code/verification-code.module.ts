import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendCodeComponent } from './send-code/send-code.component';

@NgModule({
  declarations: [SendCodeComponent],
  imports: [
    CommonModule
  ],
  exports: [SendCodeComponent]
})
export class VerificationCodeModule { }
