import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookLikeCountComponent } from './facebook-like-count/facebook-like-count.component';



@NgModule({
  declarations: [FacebookLikeCountComponent],
  imports: [
    CommonModule
  ],
  exports: [FacebookLikeCountComponent]
})
export class FacebookLikeCountModule { }
