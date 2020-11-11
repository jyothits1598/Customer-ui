import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'email-mob-signup',
  templateUrl: './email-mob-signup.component.html',
  styleUrls: ['./email-mob-signup.component.scss']
})
export class EmailMobSignupComponent {
  inputType: string = 'email';
  errorMessage;

  loading: boolean = false;

  registrationForm: FormGroup = new FormGroup({
    identity: new FormControl(null, [
      CustomValidators.required('Email is required.'),
      CustomValidators.email('Email is invalid')
    ]),
    password: new FormControl(null, [
      CustomValidators.required('Password is required.'),
      CustomValidators.pattern(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, 'Please enter a more secure password.')
    ]),
    code: new FormControl(null, [
      CustomValidators.required('Code is required.'),
    ])
  })
  constructor(private signupService: SignupService,
    private snackBar: SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  get controls(): { [key: string]: AbstractControl; } {
    return this.registrationForm.controls;
  }

  getErrors(controlName: string) {
    return Object.values(this.registrationForm.controls[controlName].errors)[0];
  }

  signup() {
    if (this.registrationForm.invalid) { this.registrationForm.markAllAsTouched(); return; }

    this.loading = true;
    let data = { ...this.registrationForm.value };

    // prepare data
    data.email = data.identity;
    data.emailVerificationCode = data.code;
    delete data.identity;
    delete data.code;

    this.signupService.emailSignup(data).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => {
        this.snackBar.success(resp.data);
        this.router.navigate(['../profile'], { relativeTo: this.activatedRoute });
      },
      (resp) => { this.handleError(resp.error) }
    )
  }

  handleError(error) {
    if (error.emailVerificationCode) this.controls.code.setErrors({ backend: error.emailVerificationCode[0] })
  }



}
