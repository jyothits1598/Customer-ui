import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { URL_forgotPassword } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { APP_LINK } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  sending: boolean = false;
  emailSentMsg: string;
  backendErrorMsg: string;

  constructor(private restApiService: RestApiService) { }

  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      CustomValidators.required('Email is required.'),
      CustomValidators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email.')
    ])
  })

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sending = true;
    this.restApiService.post(
      URL_forgotPassword,
      {
        email: this.form.controls.email.value,
        next_url: APP_LINK + 'reset-password'
      }
    ).pipe(finalize(() => this.sending = false)).subscribe(
      (resp) => {
        this.emailSentMsg = resp.data;
      },
      (resp) => { this.handleErrors(resp) }
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

  returnErrors() {
    return Object.values(this.form.controls.email.errors)[0];
  }

}
