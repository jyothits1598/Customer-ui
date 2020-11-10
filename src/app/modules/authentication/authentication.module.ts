import { NgModule } from '@angular/core';
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
        providers: [
          // {
          //   id: GoogleLoginProvider.PROVIDER_ID,
          //   provider: new GoogleLoginProvider(
          //     'clientId'
          //   ),
          // },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('400251424602161'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    SocialAuthHelperService,
    SignupService
  ]
})
export class AuthenticationModule { }
