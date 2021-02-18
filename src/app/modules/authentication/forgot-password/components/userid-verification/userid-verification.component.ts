import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
import { User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators, FormHelper } from 'src/app/helpers/validators';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'userid-verification',
  templateUrl: './userid-verification.component.html',
  styleUrls: ['./userid-verification.component.scss']
})
export class UseridVerificationComponent implements OnInit {
  loggedUser: User;
  loading: boolean = false;
  emailSentMsg: string;
  backendErrorMsg: string;
  unSub$ = new Subject<true>();

  setErrors = FormHelper.setErrors;

  isEmailActive: boolean;
  
  @Output() varificationData = new EventEmitter<{ type: 'email' | 'mobile', code: string, value: string }>();

  toggleType() {
    if (this.isEmailActive) {
      this.isEmailActive = false;
      if (!this.loggedUser) {
        this.form.controls.email.disable();
        this.form.controls.mobile_number.enable();
      }
    } else {
      this.isEmailActive = true;
      if (!this.loggedUser) {
        this.form.controls.email.enable();
        this.form.controls.mobile_number.disable();
      }
    }
  }

  constructor(private forgotPassword: ForgotPasswordService,
    private authSrv: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authSrv.loggedUser;

    this.form = new FormGroup({
      email: new FormControl({ value: this.loggedUser?.email, disabled: !!this.loggedUser }, [
        CustomValidators.required('Email is required.'),
        CustomValidators.email('Please enter a valid email.')
      ]),
      mobile_number: new FormControl({ value: this.loggedUser?.phoneNumber, disabled: true }, [
        CustomValidators.required('Mobile number is required.')
      ]),
      token: new FormControl('', [
        CustomValidators.required('Please enter verification code')
      ]),
    })
  }

  get activeIdControl() {
    return this.isEmailActive ? this.form.controls.email : this.form.controls.mobile_number;
  }

  getSendCodeData() {
    if (this.loggedUser) {
      //email and mobile is available
      return {
        type: this.isEmailActive ? 'email' : 'mobile',
        value: this.isEmailActive ? this.loggedUser.email : this.loggedUser.phoneNumber,
        purpose: 'forgotPassword'
      }
    }
    else {
      if (this.activeIdControl.invalid) return null;
      else return {
        type: this.isEmailActive ? 'email' : 'mobile',
        value: this.activeIdControl.valid,
        purpose: 'forgotPassword'
      }
    }
  }

  form: FormGroup;

  getErrors(controlName: string) {
    return Object.values(this.form.controls[controlName].errors)[0];
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    let data: any = { type: this.isEmailActive ? 'email' : 'mobile', value: this.activeIdControl.value, code: this.form.controls.token.value };
    this.forgotPassword.verfiyUser(data).pipe(finalize(() => { this.loading = false; })).subscribe(
      () => { this.varificationData.emit(data) },
      (resp: BackendErrorResponse) => this.setErrors(this.form, resp)
    )
  }

}
