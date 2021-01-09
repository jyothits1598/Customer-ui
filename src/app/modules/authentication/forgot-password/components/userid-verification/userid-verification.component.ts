import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CustomValidators } from 'src/app/helpers/validators';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'userid-verification',
  templateUrl: './userid-verification.component.html',
  styleUrls: ['./userid-verification.component.scss']
})
export class UseridVerificationComponent implements OnInit {

  loading: boolean = false;
  emailSentMsg: string;
  backendErrorMsg: string;

  get activeType(): 'email' | 'mobile' {
    return this.form.controls.mobile.enabled ? 'mobile' : 'email';
  }

  @Output() varificationData = new EventEmitter<{ type: 'email' | 'mobile', code: string, value: string }>();

  toggleType() {
    if (this.form.controls.mobile.enabled) {
      this.form.controls.email.enable();
      this.form.controls.mobile.disable();
    } else {
      this.form.controls.email.disable();
      this.form.controls.mobile.enable();
    }
  }

  constructor(private forgotPassword: ForgotPasswordService) { }

  ngOnInit(): void {
    this.form.controls.email.disable();
  }

  get activeIdControl() {
    return this.activeType === 'email' ? this.form.controls.email : this.form.controls.mobile;
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
      CustomValidators.required('Please enter verification code')
    ]),
    // password: new FormControl('', [
    //   CustomValidators.required('Please enter your new password.')
    // ])
  })

  getErrors(controlName: string) {
    return Object.values(this.form.controls[controlName].errors)[0];
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
    // let data = { ...this.form.value };
    // data.type = this.activeType;
    // this.signupService.newPassword(data).pipe(finalize(() => this.loading = false)).subscribe(
    //   () => this.router.navigate(['../success'], { relativeTo: this.route }),
    //   (resp) => this.handleErrors(resp)
    // )
    let data = { type: this.activeType, value: this.activeIdControl.value, code: this.form.controls.verificationCode.value };
    this.forgotPassword.verfiyUser(data).pipe(finalize(() => { this.loading = false; })).subscribe(
      () => { this.varificationData.emit(data) },
      (resp) => this.handleErrors(resp)
    )
  }

  handleErrors(data: any) {
    console.log('inside handle error', data);
    if (data.error?.email) this.form.controls.email.setErrors({ backend: data.error.email })
    if (data.error.verificationCode) this.form.controls.verificationCode.setErrors({ backend: data.error.verificationCode })
    if (data.error?.error_msg) this.backendErrorMsg = data.error.error_msg;
    if (data.error?.mobile_number) this.form.controls.mobile_number.setErrors({ backend: data.error.mobile_number })
  }

}
