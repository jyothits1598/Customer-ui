import { HttpErrorResponse } from '@angular/common/http';
import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ɵConsole } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { finalize, switchMap, take } from 'rxjs/operators';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
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
  error: string;

  loading = true;
  facebookLoading: boolean = false;
  googleLoading: boolean = false;
  appleLoading: boolean = false;
  
  reqSubs: Subscription;

  signin_url: string = "/auth/signin";

  //used to diffentiate between login/signup
  isLogin: boolean = false;

  @Output() signedIn = new EventEmitter<boolean>();
  constructor(private socialAuthHelper: SocialAuthHelperService,
    private authService: AuthService,
    private snackBar: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private libraryLoaderService: LibraryLoaderService) {
  }

  ngOnInit(): void {
    // this.loadLibraries();
    if (this.router.url && this.router.url.indexOf(this.signin_url) > -1) this.isLogin = true;
    this.socialAuthHelper.hasLoaded.pipe(take(1)).subscribe(loaded => { this.loading = false; console.log('reading init state of ngx login', loaded) }, (err) => { console.log('error inside ngx init', err) });

  }

  get inProgress(): boolean {
    return this.loading || this.facebookLoading || this.googleLoading;
  }

  facebookSignin() {
    let data: { email: string, token: string, firstName: string, lastName: string };
    this.reqSubs = this.socialAuthHelper.facebookSignIn().pipe(
      switchMap((fbResp) => {
        this.facebookLoading = true;
        return this.authService.socialSignIn(fbResp, 'facebook');
      }),
      finalize(() => this.facebookLoading = false)
    ).subscribe(
      () => { this.signedIn.emit(true); this.socialAuthHelper.logout(); },
      (err) => this.handleError(err, data)
    )
  }

  googleSignin() {
    let data: { email: string, token: string, firstName: string, lastName: string, type: string };
    this.reqSubs = this.socialAuthHelper.googleSignIn().pipe(
      switchMap((fbResp) => {
        this.googleLoading = true;
        data = fbResp;
        return this.authService.socialSignIn(fbResp, 'google');
      }),
      finalize(() => this.googleLoading = false)
    ).subscribe(
      () => { this.signedIn.emit(true); this.socialAuthHelper.logout(); },
      (err) => this.handleError(err, data)
    )
    // this.googleLoading = true;
    // this.libraryLoaderService.loadLibrary(ExternalLibraries.GoogleLogin).subscribe(
    //   () => gapi.load('auth2', (ld) => {
    //     let auth = gapi.auth2.init({
    //       client_id: '369468801567-ncm9je96ikkbhf210j82ptf7uj7jttnj.apps.googleusercontent.com',
    //       scope: 'profile'
    //     }).then((auth) => {
    //       console.log('sign in then function, ', auth.signIn().then(
    //         (log) => { console.log('login resp') }
    //       ))
    //     });

    //     // gapi.auth2.authorize(null, ()=>{console.log('this is ')})



    //   })
    // )

  }

  appleSignIn() {
    AppleID.auth.signIn();
    window.addEventListener('AppleIDSignInOnSuccess', (event) => {
      console.log('Got a sign in message: ' + JSON.stringify(event));
    })
  }

  loadLibraries() {
    // this.libraryLoaderService.loadLibrary(ExternalLibraries.AppleLogin).subscribe(
    //   () => {
    //     this.appleLoading = false;
    //     AppleID.auth.init(
    //       {
    //         clientId: 'menuapp.com',
    //         scope: 'email name',
    //         redirectURI: 'https://uat.menuzapp.com/apple-signin',
    //         usePopup: true,
    //         state: '{url: "localhost:4200/apple-confirmation", code: "fasdf"}',
    //       }
    //     )
    //   }
    // )
  }

  handleError(err: BackendErrorResponse, data) {
    if (err.status === 422 && (err.errors?.email[0] === 'The email does not exist.')) {
      this.router.navigate(['./create'], { relativeTo: this.route, state: data, queryParams: { verifiedEmail: true } })
    } else {
      this.socialAuthHelper.logout();
    }
  }

  ngOnDestroy(): void {
    if (this.reqSubs) this.reqSubs.unsubscribe();
  }

}
