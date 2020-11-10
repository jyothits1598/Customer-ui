import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthComponent } from './components/social-auth/social-auth.component';



@NgModule({
  declarations: [SocialAuthComponent],
  imports: [
    CommonModule
  ],
  exports: [SocialAuthComponent]
})
export class SocialAuthModule { }
