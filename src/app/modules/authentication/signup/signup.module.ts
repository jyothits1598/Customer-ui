import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordHelperModule } from '../password-helper/password-helper.module';
import { EmailMobSignupComponent } from './components/email-mob-signup/email-mob-signup.component';
import { BasicProfileComponent } from './components/basic-profile/basic-profile.component';
import { SocialAuthModule } from '../social-auth/social-auth.module';
import { NotSignedInGuard } from '../guards/not-signed-in.guard';
import { IsAuthenticatedGuard } from 'src/app/core/guards/is-authenticated.guard';
import { FileUploadModule } from '../../file-upload/file-upload.module';
import { VerificationCodeModule } from '../verification-code/verification-code.module';
import { TelInputModule } from '../../tel-input/tel-input.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'create',
    component: EmailMobSignupComponent,
    canActivate: [NotSignedInGuard],
  },
  {
    path: 'profile',
    component: BasicProfileComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: '',
    component: SignupComponent,
    canActivate: [NotSignedInGuard],
  }
]

@NgModule({
  declarations: [SignupComponent, EmailMobSignupComponent, BasicProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PasswordHelperModule,
    SocialAuthModule,
    FileUploadModule,
    VerificationCodeModule,
    TelInputModule
  ]
})
export class SignupModule { }
