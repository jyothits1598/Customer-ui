import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URL_forgotPassword } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { APP_LINK } from 'src/environments/environment';
import { SignupService } from '../../../signup/services/signup.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading: boolean = false;
  emailSentMsg: string;
  backendErrorMsg: string;

  get activeType(): 'email' | 'mobile' {
    return this.form.controls.email.enabled ? 'email' : 'mobile';
  }

  toggleType() {
    if (this.form.controls.email.enabled) {
      this.form.controls.mobile.enable();
      this.form.controls.email.disable();
    } else {
      this.form.controls.mobile.disable();
      this.form.controls.email.enable();
    }
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private signupService: SignupService) { }

  ngOnInit(): void {
    this.form.controls.mobile.disable();
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      CustomValidators.required('Email is required.'),
      CustomValidators.email('Please enter a valid email.')
    ]),
    mobile: new FormControl('', [
      CustomValidators.required('Mobile number is required.')
    ]),
    verificationCode: new FormControl('', [
      CustomValidators.required('Verification code is required.')
    ]),
    password: new FormControl('', [
      CustomValidators.required('Please enter your new password.')
    ])
  })

  getErrors(controlName: string) {
    return Object.values(this.form.controls[controlName].errors)[0];
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('form is invalid');
      return;
    }

    this.loading = true;
    // this.restApiService.post(
    //   URL_forgotPassword,
    //   {
    //     email: this.form.controls.email.value,
    //     next_url: APP_LINK + 'reset-password'
    //   }
    // ).pipe(finalize(() => this.loading = false)).subscribe(
    //   (resp) => {
    //     this.emailSentMsg = resp.data;
    //   },
    //   (resp) => { this.handleErrors(resp) }
    // )
    ;
    let data = { ...this.form.value };
    data.type = this.activeType;
    this.signupService.newPassword(data).pipe(finalize(() => this.loading = false)).subscribe(
      () => this.router.navigate(['../success'], {relativeTo: this.route}),
      (resp) => this.handleErrors(resp)
    )
  }

  handleErrors(data: any) {
    if (data.error?.email) {
      this.form.controls.email.setErrors({ backend: data.error.email })
      return;
    }
    if (data.error?.error_msg) {
      this.backendErrorMsg = data.error.error_msg;
    }
  }

}
