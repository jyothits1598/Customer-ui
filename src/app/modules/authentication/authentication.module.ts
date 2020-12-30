import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NotSignedInGuard } from './guards/not-signed-in.guard';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
  VKLoginProvider
} from 'angularx-social-login';
import { SocialAuthHelperService } from './services/social-auth-helper.service';
import { AuthParentComponent } from './pages/auth-parent/auth-parent.component';
import { SignupService } from './signup/services/signup.service';
import { AuthService } from 'src/app/core/services/auth.service';

@NgModule({
  declarations: [AuthParentComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SocialLoginModule
  ],
  providers: [
    NotSignedInGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        // onError: (error) => {
        //   console.log('inside on error', SocialAuthHelperService);
        // },
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '369468801567-ncm9je96ikkbhf210j82ptf7uj7jttnj.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('674234386615039'),
            // provider: new FacebookLoginProvider('1047824149014745'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    SocialAuthHelperService,
    SignupService
  ]
})
export class AuthenticationModule { }
