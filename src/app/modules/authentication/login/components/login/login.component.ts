import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { URL_login } from 'src/api/authentication';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SocialAuthHelperService } from '../../../services/social-auth-helper.service';
import { SignupService } from '../../../signup/services/signup.service';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('ab', [
      // ...
      state('a', style({
        backgroundColor: 'pink'
      })),
      state('b', style({
        backgroundColor: 'red'
      })),
      // transition('a => b', [
      //   animate('1s')
      // ]),
      // transition('b => a', [
      //   animate('0.5s')
      // ]),
      transition('a => void', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loggingIn: boolean = false;
  backendErrorMessage: string;

  animationState = 'a';
  showButton = true;

  get activeType(): 'mobile' | 'email' {
    return this.loginForm.controls.email.enabled ? 'email' : 'mobile';
  }

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm.controls.mobile.disable();
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      CustomValidators.required('Please enter a registered email.'),
      CustomValidators.email('Please enter a valid email.')
    ]),
    mobile: new FormControl('', [
      CustomValidators.required('Please enter a registered mobile number.')
    ]),
    password: new FormControl('', CustomValidators.required('Please enter a password.'))
  });

  toggleType() {
    if (this.loginForm.controls.email.enabled) {
      this.loginForm.controls.email.disable();
      this.loginForm.controls.mobile.enable();
    } else {
      this.loginForm.controls.email.enable();
      this.loginForm.controls.mobile.disable();
    }
  }

  returnErrors(controlName: string) {
    return Object.values(this.loginForm.controls[controlName].errors)[0];
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loggingIn = true;
    let data = { ...this.loginForm.value };
    data.type = this.activeType;

    this.authService.login(data).pipe(finalize(() => this.loggingIn = false)).subscribe(
      (s) => { this.afterSignin() },
      (e) => { this.handleErrors(e) }
    )
  }

  afterSignin() {
    this.route.snapshot.queryParams.redirect ?
      this.router.navigate([this.route.snapshot.queryParams.redirect])
      : this.router.navigate(['/'])
  }

  handleErrors(error: any) {
    if (error.error) {
      if (error.error.email) {
        this.loginForm.controls.email.setErrors({ 'backend': error.error.email });
        return;
      }
      if (error.error.password) {
        this.loginForm.controls.password.setErrors({ 'backend': error.error.password })
        return;
      }
      if (error.error.error_msg) this.backendErrorMessage = error.error.error_msg;
    }
  }

}
