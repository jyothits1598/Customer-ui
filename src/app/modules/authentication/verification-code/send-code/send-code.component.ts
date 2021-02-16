import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { URL_SendCodeChange, URL_SendCodeForgotPassword, URL_SendCodeSignup } from 'src/api/authentication';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent implements OnDestroy {
  @Input() data: {
    type: 'email' | 'mobile',
    value: string,
    purpose: 'signup' | 'forgotPassword' | 'change';
  };
  @Output() error = new EventEmitter<BackendErrorResponse>();

  loading: boolean = false;
  sent: boolean = false;
  unSub$ = new Subject<true>();

  constructor(private snackBar: SnackBarService,
    private restApiService: RestApiService) { }

  sendCode() {
    if (!this.data.value) return;
    this.loading = true;
    this.sendCodeObs(this.data.value, this.data.type, this.data.purpose).pipe(takeUntil(this.unSub$), finalize(() => this.loading = false)).subscribe(
      (resp) => { this.snackBar.success(resp.message); this.sent = true; },
      (errResp) => this.error.emit(errResp)
    )
  }

  sendCodeObs(value: string, type: 'email' | 'mobile' = 'email', purpose: 'signup' | 'forgotPassword' | 'change') {
    let data: any = {
      type: type
    };
    if (type === 'email') data.email = value
    else data.mobile_number = value;
    let url;
    switch (this.data.purpose) {
      case 'signup':
        url = URL_SendCodeSignup;
        data.action = 'signup'
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
    this.error.emit(errorResp);
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
  }

}
