import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { SignupData, SignupService } from '../../services/signup.service';

@Component({
  selector: 'email-mob-signup',
  templateUrl: './email-mob-signup.component.html',
  styleUrls: ['./email-mob-signup.component.scss']
})
export class EmailMobSignupComponent implements OnInit {
  errorMessage;
  loading: boolean = false;
  unSub$ = new Subject<true>();
  verifiedEmail: boolean = false;
  type: 'google' | 'facebook' | 'menuzapp';

  registrationForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [CustomValidators.required('First name is required.')]),
    last_name: new FormControl(null, [CustomValidators.required('Last name is required.')]),
    email: new FormControl(null, [
      CustomValidators.required('Email is required.'),
      CustomValidators.email('Email is invalid.')
    ]),
    email_token: new FormControl(null, [
      CustomValidators.required('Please enter verification code'),
    ]),
    mobile_number: new FormControl(null, [
      CustomValidators.required('Mobile number is required.')
    ]),
    password: new FormControl(null, [
      CustomValidators.required('Password is required.'),
      CustomValidators.pattern(/^.*(?=.{6,}).*$/, 'Please enter a valid password of 6+ characters')
      // CustomValidators.pattern(/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, 'Please enter a valid password of 6+ characters and atleast one digit, one capital & special character')
      // CustomValidators.pattern(/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$/, 'Please enter a valid password of 6+ characters and atleast one digit, one capital')
    ]),
  })

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
    private authService: AuthService) { }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.queryParams.authType || 'menuzapp';
    this.router.navigate([], { queryParams: {} });
    this.activatedRoute.queryParams.pipe().subscribe((q) => this.verifiedEmail = !!q.verifiedEmail)
  }

  get controls(): { [key: string]: AbstractControl; } {
    return this.registrationForm.controls;
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

  get activeType() {
    return this.registrationForm.controls.mobile.disabled ? 'email' : 'mobile';
  }

  get activeIdControl(): AbstractControl {
    return this.activeType === 'email' ? this.registrationForm.controls.email : this.registrationForm.controls.mobile;
  }

  toggleType() {
    if (this.controls.email.disabled) {
      this.controls.email.enable();
      this.controls.mobile.disable();
    } else {
      this.controls.email.disable();
      this.controls.mobile.enable();
    }
  }

  signup() {
    if (this.mobForm.invalid) { this.mobForm.markAllAsTouched(); return; }
    this.loading = true;

    // prepare data
    let data: SignupData = { ...this.emailForm.value, ...this.mobForm.value };
    data.auth_type = this.type;

    // this.signupService.emailSignup(data).pipe(finalize(() => this.loading = false)).subscribe(
    //   (resp) => {
    //     this.authService.handleLoginResp(resp);
    //     this.router.navigate(['/profile'], { relativeTo: this.activatedRoute, queryParams: { new: true } });
    //   },
    //   // (resp) => { this.handleError(resp) }
    // )

    this.signupService.signup(data).pipe(finalize(() => this.loading = false)).subscribe(
      (r) => this.authService.handleLoginResp(r),
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


}
