import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class SocialAuthHelperService {
  hasLoaded: Observable<boolean>;
  
  constructor(private authService: SocialAuthService) {
    this.hasLoaded = this.authService.initState;
  }

  facebookSignIn(): Observable<{ email: string, token: string, firstName: string, lastName: string, type: string }> {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    return this.authService.authState.pipe(
      take(1),
      map((resp) => {
        let result = {
          token: resp.authToken,
          email: resp.email,
          firstName: resp.firstName,
          lastName: resp.lastName,
          type: 'facebook'
        }
        return result;
      })
    );
  }

  googleSignIn(): Observable<{ email: string, token: string, firstName: string, lastName: string, type: string }> {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    return this.authService.authState.pipe(
      take(1),
      map((resp) => {
        let result = {
          token: resp.idToken,
          email: resp.email,
          firstName: resp.firstName,
          lastName: resp.lastName,
          type: 'google'
        }
        return result;
      })
    );
  }

  logout(){
    this.authService.signOut();
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
