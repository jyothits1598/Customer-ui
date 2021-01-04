import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelInputComponent } from './tel-input/tel-input.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TelInputComponent],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [TelInputComponent]
})
export class TelInputModule { }
