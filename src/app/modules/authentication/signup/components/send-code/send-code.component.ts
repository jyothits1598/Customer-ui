import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'send-code',
  templateUrl: './send-code.component.html',
  styleUrls: ['./send-code.component.scss']
})
export class SendCodeComponent {
  @Input() data: { type: 'email' | 'mobile', identity: string };
  @Output() error = new EventEmitter<string>();

  loading: boolean = false;
  sent: boolean = false;

  constructor(private signupService: SignupService,
    private snackBar: SnackBarService) { }

  sendCode() {
    if (!this.data.identity) return;
    this.loading = true;
    this.signupService.sendCode(this.data.identity, this.data.type).pipe(finalize(() => this.loading = false)).subscribe(
      (resp) => { this.snackBar.success(resp.data); this.sent = true; },
      (errResp) => this.error.emit(errResp.error.error_msg[0])
    )
  }

}
