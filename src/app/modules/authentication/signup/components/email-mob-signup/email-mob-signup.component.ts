import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { SocialAuthHelperService } from '../../../services/social-auth-helper.service';
import { SignupData, SignupService } from '../../services/signup.service';

@Component({
  selector: 'email-mob-signup',
  templateUrl: './email-mob-signup.component.html',
  styleUrls: ['./email-mob-signup.component.scss']
})
export class EmailMobSignupComponent implements OnInit, OnDestroy {
  errorMessage;
  loading: boolean = false;
  unSub$ = new Subject<true>();
  verifiedEmail: boolean = false;
  socialSignupData: { email: string, token: string, firstName: string, lastName: string, type: 'facebook' | 'google' };
  type: 'google' | 'facebook' | 'menuzapp';

  emailForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [CustomValidators.required('First name is required.')]),
    last_name: new FormControl(null, [CustomValidators.required('Last name is required.')]),
    email: new FormControl(null, [
      CustomValidators.required('Email is required.'),
      CustomValidators.email('Email is invalid.')
    ]),
    email_token: new FormControl(null, [
      CustomValidators.required('Please enter verification code'),
    ]),
  });

  mobForm: FormGroup = new FormGroup({
    mobile_number: new FormControl(null, [
      CustomValidators.required('Mobile number is required.'),
    ]),
    mobile_token: new FormControl(null, [
      CustomValidators.required('Please enter verification code'),
    ]),
    password: new FormControl(null, [
      CustomValidators.required('Password is required.'),
      CustomValidators.pattern(/^.*(?=.{6,}).*$/, 'Please enter a valid password of 6+ characters')
    ])
  })

  constructor(private signupService: SignupService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private sAuth: SocialAuthHelperService) {
    this.socialSignupData = router.getCurrentNavigation().extras.state as { email: string, token: string, firstName: string, lastName: string, type: 'google' | 'facebook' };
  }

  ngOnInit(): void {
    this.type = this.socialSignupData?.type || 'menuzapp';
    if (!this.socialSignupData) this.router.navigate([], { queryParams: {} });
    if (this.socialSignupData) {
      this.emailForm.patchValue({ first_name: this.socialSignupData.firstName, last_name: this.socialSignupData.lastName, email_token: this.socialSignupData.token, email: this.socialSignupData.email })
      this.mobForm.controls.password.disable();
    }
    this.activatedRoute.queryParams.pipe().subscribe((q) => this.verifiedEmail = !!q.verifiedEmail);
  }

  get emailControls(): { [key: string]: AbstractControl; } {
    return this.emailForm.controls;
  }
  get mobControls(): { [key: string]: AbstractControl; } {
    return this.mobForm.controls;
  }

  validateEmail() {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    this.signupService.verifyEmai(this.emailForm.value.email, this.emailForm.value.email_token).pipe(
      takeUntil(this.unSub$),
      finalize(() => this.loading = false)).subscribe(
        () => this.next(),
        (e: BackendErrorResponse) => {
          if (e.errors.token) {
            e.errors.email_token = e.errors.token;
          }
          this.setErrors(this.emailForm, e);
        }
      )
  }

  signup() {
    this.mobForm.markAllAsTouched();
    if (this.mobForm.invalid) { return; }
    this.loading = true;

    // prepare data
    let data: SignupData = { ...this.emailForm.value, ...this.mobForm.value };
    data.auth_type = this.type;

    this.signupService.signup(data).pipe(finalize(() => this.loading = false)).subscribe(
      (r) => { this.authService.handleLoginResp(r); this.router.navigate(['/']) },
      (e) => this.setErrors(this.mobForm, e)
    )
  }

  next() { this.router.navigate([], { queryParams: { verifiedEmail: true } }) }

  back() { this.router.navigate([], { queryParams: {} }) }

  setErrors(fc: FormGroup, eResp: BackendErrorResponse) {
    for (const key in eResp.errors) {
      if (Object.prototype.hasOwnProperty.call(eResp.errors, key)) {
        const c: AbstractControl = fc.controls[key];
        if (c) c.setErrors({ backend: (eResp.errors[key])[0] })
      }
    }
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
    if (this.socialSignupData) this.sAuth.logout();
  }


}
