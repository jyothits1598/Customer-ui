import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URL_verify } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {

  authToken: string;
  emailToken: string;

  verifying: boolean = true;
  verified: boolean = false;
  verifyingError: string;

  constructor(private route: ActivatedRoute,
    private restApiService: RestApiService) { }

  ngOnInit(): void {
    this.authToken = this.route.snapshot.queryParams.auth_token;
    this.emailToken = this.route.snapshot.queryParams.email_token;
    let data = {
      email_token: this.emailToken,
      auth_token: this.authToken
    }
    this.restApiService.patch(URL_verify, data).pipe(finalize(() => this.verifying = false)).subscribe(
      (resp) => { this.verified = true },
      (resp) => { this.verifyingError = resp.error.error_msg }
    )
  }

}
