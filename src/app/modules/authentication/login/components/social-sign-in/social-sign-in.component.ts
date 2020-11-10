import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocialAuthHelperService } from '../../../services/social-auth-helper.service';
import { SignupService } from '../../../signup/services/signup.service';

@Component({
  selector: 'social-sign-in',
  templateUrl: './social-sign-in.component.html',
  styleUrls: ['./social-sign-in.component.scss']
})
export class SocialSignInComponent implements OnInit {
  @Output() signedIn = new EventEmitter<boolean>();
  facebookLoading: boolean = false;

  constructor(private socialAuth: SocialAuthHelperService,
    private signupService: SignupService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  facebookSignin() {
    this.facebookLoading = true;
    // this.socialAuth.facebookSignIn().subscribe(
    //   (facebookResp) => {
    //     this.authService.facebookSignin(facebookResp).pipe(
    //       catchError((errResp) => {
    //         console.log('there is an error');
    //         if (errResp.error?.email[0] === "Couldn't find your Menuzapp account") return this.signupService.facebookSignup(facebookResp);
    //         else throwError(errResp)
    //       })
    //     ).pipe(finalize(() => this.facebookLoading = false)).subscribe(
    //       (s) => {
    //         this.signedIn.emit(true);
    //       },
    //       (e) => { console.log('final login resp', e) }
    //     )
    //   }
    // )
  }

}
