import { Injectable } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";

@Injectable()
export class SocialAuthHelperService {

  constructor(private authService: SocialAuthService) { }

  facebookSignIn() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    return this.authService.authState;
    // this.authService.authState.subscribe(user => { console.log('recieved user, ', user) });
  }
}
