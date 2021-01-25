import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleRatingComponent } from './google-rating/google-rating.component';
import { Observable, observable } from 'rxjs';
import { GoogleRatingService } from './services/google-rating.service';



@NgModule({
  declarations: [GoogleRatingComponent],
  imports: [
    CommonModule
  ],
  exports:[
    GoogleRatingComponent
  ],
  providers: [GoogleRatingService]
})
export class GoogleRatingModule { }
