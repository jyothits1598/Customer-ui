import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PresentAvailabilityComponent } from './present-availability/present-availability.component';



@NgModule({
  declarations: [PresentAvailabilityComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PresentAvailabilityComponent
  ]
})
export class TimeAvailabilityModule { }
