import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleRatingComponent } from './google-rating/google-rating.component';
import { Observable, observable } from 'rxjs';



@NgModule({
  declarations: [GoogleRatingComponent],
  imports: [
    CommonModule
  ],
  exports:[
    GoogleRatingComponent
  ]
})
export class GoogleRatingModule { }
