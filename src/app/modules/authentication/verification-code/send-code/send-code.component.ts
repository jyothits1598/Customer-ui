import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { URL_SendCodeChange, URL_SendCodeForgotPassword, URL_SendCodeSignup } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SignupService } from 'src/app/modules/authentication/signup/services/signup.service';

@Component({
  selector: 'send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent {
  @Input() data: {
    type: 'email' | 'mobile',
    value: string,
    purpose: 'signup' | 'forgotPassword' | 'change';
  };
  @Output() error = new EventEmitter<string>();

  loading: boolean = false;
  sent: boolean = false;

  constructor(private snackBar: SnackBarService,
    private restApiService: RestApiService) { }

  sendCode() {
    if (!this.data.value) return;
    this.loading = true;
    this.sendCodeObs(this.data.value, this.data.type, this.data.purpose).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => { this.snackBar.success(resp.data); this.sent = true; },
      (errResp) => this.handleError(errResp)
    )
  }

  sendCodeObs(value: string, type: 'email' | 'mobile' = 'email', purpose: 'signup' | 'forgotPassword' | 'change') {
    let data: any = {
      type: type === 'email' ? 'email' : 'mobile_number'
    };
    if (type === 'email') data.email = value
    else data.mobile_number = value;
    let url;
    switch (this.data.purpose) {
      case 'signup':
        url = URL_SendCodeSignup;
        break;
      case 'forgotPassword':
        url = URL_SendCodeForgotPassword;
        break;
      case 'change':
        url = URL_SendCodeChange;
        break;
    }

    return this.restApiService.post(url, data);
  }

  handleError(errorResp: any) {
    // if (errorResp.error.error_msg) { this.error.emit(errorResp.error.error_msg[0]); return; };
    // if (errorResp.error.email) { this.error.emit() }

    this.error.emit(errorResp);
  }

}
