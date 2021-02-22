import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CustomValidators } from 'src/app/helpers/validators';
import { ForgotPasswordService } from '../../../services/forgot-password.service';

@Component({
  selector: 'app-enter-password',
  templateUrl: './enter-password.component.html',
  styleUrls: ['./enter-password.component.scss']
})
export class EnterPasswordComponent implements OnInit {
  @Input() verficationData: { type: 'email' | 'mobile', code: string, value: string };
  @Output() passwordChanged = new EventEmitter<null>();
  loading: boolean = false;
  errorMsg: string;

  constructor(private forgetPassServ: ForgotPasswordService) { }

  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('', [
      CustomValidators.required('Please enter your new password.')
    ])
  })

  ngOnInit(): void {
  }

  savePassword() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) {
      return;
    }
    this.loading = true;

    let req: any = { ...this.verficationData };
    req.password = this.passwordForm.controls.password.value;

    this.forgetPassServ.setPassword(req).pipe(finalize(() => { this.loading = false; })).subscribe(
      () => { this.passwordChanged.emit(null) },
      (error) => { this.handleError(error); }
    );
  }

  handleError(resp) {
    this.errorMsg = Object.values(resp.error)[0][0];
  }

  getpasswordError() {
    return Object.values(this.passwordForm.controls.password.errors)[0];
  }

}
