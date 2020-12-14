import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'email-mob-signup',
  templateUrl: './email-mob-signup.component.html',
  styleUrls: ['./email-mob-signup.component.scss']
})
export class EmailMobSignupComponent implements OnInit {
  errorMessage;
  loading: boolean = false;

  registrationForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      CustomValidators.required('Email is required.'),
      CustomValidators.email('Email is invalid.')
    ]),
    mobile: new FormControl(null, [
      CustomValidators.required('Mobile number is required.')
    ]),
    password: new FormControl(null, [
      CustomValidators.required('Password is required.'),
      CustomValidators.pattern(/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, 'Please enter a valid password of 6+ characters and atleast one digit, one capital & special character')
      // CustomValidators.pattern(/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$/, 'Please enter a valid password of 6+ characters and atleast one digit, one capital')
    ]),
    verificationCode: new FormControl(null, [
      CustomValidators.required('Code is required'),
    ])
  })
  constructor(private signupService: SignupService,
    private snackBar: SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService) { }
  ngOnInit(): void {
    this.registrationForm.controls.mobile.disable();
  }

  get controls(): { [key: string]: AbstractControl; } {
    return this.registrationForm.controls;
  }

  get activeType() {
    return this.registrationForm.controls.email.disabled ? 'mobile' : 'email';
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

  getErrors(controlName: string) {
    return Object.values(this.registrationForm.controls[controlName].errors)[0];
  }

  signup() {
    if (this.registrationForm.invalid) { this.registrationForm.markAllAsTouched(); console.log('form is invalid', this.registrationForm.errors); return; }
    this.loading = true;

    // prepare data
    let data = { ...this.registrationForm.value };
    data.type = this.activeType;

    this.signupService.emailSignup(data).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => {
        this.authService.handleLoginResp(resp);
        this.router.navigate(['/profile'], { relativeTo: this.activatedRoute, queryParams: { new: true } });
      },
      (resp) => { this.handleError(resp) }
    )
  }

  handleError(errorResp) {
    if (errorResp.error.error_msg) this.errorMessage = errorResp.error.error_msg[0];
    if (errorResp.error.verificationCode) this.controls.verificationCode.setErrors({ backend: errorResp.error.verificationCode[0] });
    if (errorResp.error.email) this.controls.email.setErrors({ backend: errorResp.error.email[0] })
  }



}
