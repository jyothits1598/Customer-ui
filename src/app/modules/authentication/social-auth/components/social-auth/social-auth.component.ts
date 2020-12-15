import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ɵConsole } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ExternalLibraries, LibraryLoaderService } from 'src/app/core/services/library-loader.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SocialAuthHelperService } from '../../../services/social-auth-helper.service';

@Component({
  selector: 'social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit, OnDestroy {

  facebookLoading: boolean = false;
  googleLoading: boolean = false;
  appleLoading: boolean = true;

  reqSubs: Subscription;

  signin_url: string = "/auth/signin";

  //used to diffentiate between login/signup
  isLogin: boolean = false;

  @Output() signedIn = new EventEmitter<boolean>();
  constructor(private socialAuthHelper: SocialAuthHelperService,
    private authService: AuthService,
    private snackBar: SnackBarService,
    private router: Router,
    private libraryLoaderService: LibraryLoaderService) {
  }

  ngOnInit(): void {
    this.loadLibraries();
    if (this.router.url && this.router.url.indexOf(this.signin_url) > -1) this.isLogin = true;

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

  appleSignIn() {
    AppleID.auth.signIn();
    window.addEventListener('AppleIDSignInOnSuccess', (event) => {
      console.log('Got a sign in message: ' + JSON.stringify(event));
    })
  }

  loadLibraries() {
    this.libraryLoaderService.loadLibrary(ExternalLibraries.AppleLogin).subscribe(
      () => {
        this.appleLoading = false;
        AppleID.auth.init(
          {
            clientId: 'menuapp.com',
            scope: 'email name',
            redirectURI: 'https://uat.api.menuzapp.com/apple-signin',
            usePopup:  true,
            state: 'EN'
          }
        )
      }
    )
  }

  handleError() {
    this.snackBar.error('There was an error. Please try again.')
  }

  ngOnDestroy(): void {
    if (this.reqSubs) this.reqSubs.unsubscribe();
  }

}
