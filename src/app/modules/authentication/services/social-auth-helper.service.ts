import { Injectable } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class SocialAuthHelperService {

  constructor(private authService: SocialAuthService) { }

  facebookSignIn() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    return this.authService.authState.pipe(
      take(1),
      map((fbResp) => {
        let result: any = { ...fbResp };
        result.token = result.authToken;
        return result;
      })
    );
    // this.authService.authState.subscribe(user => { console.log('recieved user, ', user) });
  }
}
