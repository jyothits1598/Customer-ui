import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocialAuthHelperService } from '../../../services/social-auth-helper.service';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'social-sign-up',
  templateUrl: './social-sign-up.component.html',
  styleUrls: ['./social-sign-up.component.scss']
})
export class SocialSignUpComponent implements OnInit {

  constructor(private socialAuth: SocialAuthHelperService,
    private signupService: SignupService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleFacebook() {
    this.socialAuth.facebookSignIn().pipe(
      switchMap((data: any) => this.signupService.facebookSignup(data)),
    ).subscribe((loginResp) => {
      this.authService.handleLoginResp(loginResp)
    });
  }

}
