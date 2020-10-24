import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URL_resetPassword } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { CustomValidators } from 'src/app/helpers/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  authToken: string;
  emailToken: string;

  resetSuccessMessage: string;
  resetErrorMessage: string;
  resetting: boolean = false;
  constructor(private route: ActivatedRoute,
    private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.form.controls.confirmPassword.setValidators([CustomValidators.required('Please renter you password.'), this.confirmPasswordValidator()])
  }

  form: FormGroup = new FormGroup({
    password: new FormControl('', [
      CustomValidators.required('Password is Required.'),
      CustomValidators.pattern(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, 'Please enter a more secure password')
    ]),
    confirmPassword: new FormControl('')
  })

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.resetting = true;
    this.authToken = this.route.snapshot.queryParams.auth_token;
    this.emailToken = this.route.snapshot.queryParams.email_token;
    let data = {
      email_token: this.emailToken,
      auth_token: this.authToken,
      new_password: this.form.controls.password.value,
      confirm_new_password: this.form.controls.confirmPassword.value
    }

    this.restApiService.patch(URL_resetPassword, data).pipe(finalize(() => { this.resetting = false })).subscribe(
      (success) => { this.resetSuccessMessage = success.data },
      () => { this.resetErrorMessage = 'There was a problem resetting the password. Please try again.' }
    )
  }

  getErrors(name: string) {
    return Object.values(this.form.controls[name].errors)[0];
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return this.form.controls.password.value === control.value ? null : { missmatch: 'Passwords do not match' }
    };
  }

}
