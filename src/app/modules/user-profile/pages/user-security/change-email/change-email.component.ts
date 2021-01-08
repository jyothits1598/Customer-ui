import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { UserProfileDataService } from '../../../services/user-profile-data.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  errorMessage;
  loading: boolean = false;

  constructor(
    private userProfileDataService: UserProfileDataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  changeForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      CustomValidators.required('Email is required.'),
      CustomValidators.email('Email is invalid.')
    ]),
    verificationCode: new FormControl(null, [
      CustomValidators.required('Please enter verification code'),
    ])
  })

  getErrors(controlName: string) {
    return Object.values(this.changeForm.controls[controlName].errors)[0];
  }

  changeEmail() {
    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.userProfileDataService.changeEmail(this.changeForm.value.email, this.changeForm.value.verificationCode).subscribe(
      () => { this.authService.setEmail(this.changeForm.value.email); this.router.navigate(['../'], {relativeTo: this.route}) },
      (err) => { this.loading = false; this.handleError(err) }
    )
  }

  handleError(errorResp) {
    if (errorResp.error.error_msg) this.errorMessage = errorResp.error.error_msg[0];
    if (errorResp.error.verificationCode) this.changeForm.controls.verificationCode.setErrors({ backend: errorResp.error.verificationCode[0] });
    if (errorResp.error.email) this.changeForm.controls.email.setErrors({ backend: errorResp.error.email[0] })
  }

}
