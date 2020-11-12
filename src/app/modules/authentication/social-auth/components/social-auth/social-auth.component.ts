import { Component, EventEmitter, OnDestroy, OnInit, Output, ɵConsole } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SocialAuthHelperService } from '../../../services/social-auth-helper.service';

@Component({
  selector: 'social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnDestroy {

  facebookLoading: boolean = false;
  googleLoading: boolean = false;

  reqSubs: Subscription;

  signup_url:string = "/auth/signup";
  signin_url:string = "/auth/signin";

  signup_active:boolean = false;
  signin_active:boolean = false;

  @Output() signedIn = new EventEmitter<boolean>();
  constructor(private socialAuthHelper: SocialAuthHelperService,
    private authService: AuthService,
    private snackBar: SnackBarService,
    private router: Router) {
      this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            this.signup_active = false;
            this.signin_active = false;
            if(this.router.url && this.router.url.indexOf(this.signup_url) > -1){
              this.signup_active = true;
            }else if(this.router.url && this.router.url.indexOf(this.signin_url) > -1){
              this.signin_active = true;
            }
          }
        }
      );
  }

  get inProgress(): boolean {
    return this.facebookLoading || this.googleLoading;
  }

  facebookSignin() {
    this.reqSubs = this.socialAuthHelper.facebookSignIn().pipe(
      switchMap((fbResp) => {
        this.facebookLoading = true;
        return this.authService.socialSignIn(fbResp, 'facebook');
      }),
      finalize(() => this.facebookLoading = false)
    ).subscribe(
      () => { this.signedIn.emit(true) },
      () => this.handleError()
    )
  }

  googleSignin() {
    this.reqSubs = this.socialAuthHelper.googleSignIn().pipe(
      switchMap((fbResp) => {
        this.googleLoading = true;
        return this.authService.socialSignIn(fbResp, 'google');
      }),
      finalize(() => this.googleLoading = false)
    ).subscribe(
      () => { this.signedIn.emit(true) },
      () => this.handleError()
    )
  }

  handleError() {
    this.snackBar.error('There was an error. Please try again.')
  }

  ngOnDestroy(): void {
    if (this.reqSubs) this.reqSubs.unsubscribe();
  }

}
