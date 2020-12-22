import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { UserProfileDataService } from '../../../services/user-profile-data.service';

@Component({
  selector: 'app-change-mobile',
  templateUrl: './change-mobile.component.html',
  styleUrls: ['./change-mobile.component.scss']
})
export class ChangeMobileComponent implements OnInit {
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
    mobile: new FormControl(null, [
      CustomValidators.required('Phone number is required.'),
    ]),
    verificationCode: new FormControl(null, [
      CustomValidators.required('Code is required'),
    ])
  })

  getErrors(controlName: string) {
    return Object.values(this.changeForm.controls[controlName].errors)[0];
  }

  changeMobile() {
    if (this.changeForm.invalid) {
      this.changeForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.userProfileDataService.changeMobile(this.changeForm.value.mobile, this.changeForm.value.verificationCode).subscribe(
      () => { this.authService.setPhoneNumber(this.changeForm.value.mobile); this.router.navigate(['../', this.route]) },
      (err) => { this.loading = false; this.handleError(err) }
    )
  }

  handleError(errorResp) {
    if (errorResp.error.error_msg) this.errorMessage = errorResp.error.error_msg[0];
    if (errorResp.error.verificationCode) this.changeForm.controls.verificationCode.setErrors({ backend: errorResp.error.verificationCode[0] });
    if (errorResp.error.mobile) this.changeForm.controls.mobile.setErrors({ backend: errorResp.error.mobile[0] })
  }
}
