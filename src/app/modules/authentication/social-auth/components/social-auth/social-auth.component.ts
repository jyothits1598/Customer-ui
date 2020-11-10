import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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

  @Output() signedIn = new EventEmitter<boolean>();
  constructor(private socialAuthHelper: SocialAuthHelperService,
    private authService: AuthService,
    private snackBar: SnackBarService) { }

  get inProgress(): boolean {
    return this.facebookLoading || this.googleLoading;
  }

  facebookSignin() {
    this.facebookLoading = true;
    this.reqSubs = this.socialAuthHelper.facebookSignIn().pipe(
      switchMap((fbResp) => {
        return this.authService.socialSignIn(fbResp, 'facebook');
      }),
      finalize(() => this.facebookLoading = false)
    ).subscribe(
      () => { this.signedIn.emit(true) },
      () => this.handleError()
    )
  }

  googleSignin() {
    this.googleLoading = true;
    this.reqSubs = this.socialAuthHelper.googleSignIn().pipe(
      switchMap((fbResp) => {
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
