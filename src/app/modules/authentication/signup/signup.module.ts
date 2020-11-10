import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordHelperModule } from '../password-helper/password-helper.module';
import { SocialSignUpComponent } from './components/social-sign-up/social-sign-up.component';
import { EmailMobSignupComponent } from './components/email-mob-signup/email-mob-signup.component';
import { SendCodeComponent } from './components/send-code/send-code.component';
import { BasicProfileComponent } from './components/basic-profile/basic-profile.component';
import { SocialAuthModule } from '../social-auth/social-auth.module';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
  {
    path: 'create',
    component: EmailMobSignupComponent
  },
  {
    path: 'profile',
    component: BasicProfileComponent
  }
]

@NgModule({
  declarations: [SignupComponent, SocialSignUpComponent, EmailMobSignupComponent, SendCodeComponent, BasicProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PasswordHelperModule,
    SocialAuthModule
  ]
})
export class SignupModule { }
