import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class SocialAuthHelperService {

  constructor(private authService: SocialAuthService) { }

  facebookSignIn(): Observable<{ email: string, token: string }> {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    return this.authService.authState.pipe(
      take(1),
      map((resp) => {
        let result = {
          token: resp.authToken,
          email: resp.email
        }
        return result;
      })
    );
  }

  googleSignIn(): Observable<{ email: string, token: string }> {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    return this.authService.authState.pipe(
      take(1),
      map((resp) => {
        let result = {
          token: resp.idToken,
          email: resp.email
        }
        return result;
      })
    );
  }

  // getAuthState(type: 'facebook' | 'google') {
  //   return this.authService.authState.pipe(
  //     take(1),
  //     map((resp) => {
  //       console.log('inside get auth map', resp);
  //       let result = {
  //         token: resp.idToken,
  //         email: resp.email
  //       }
  //       return result;
  //     })
  //   );
  // }
}
