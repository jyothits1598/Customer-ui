import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendErrorResponse, BackendResponse } from 'src/app/core/model/backend-resp';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators, FormHelper } from 'src/app/helpers/validators';
import { UserProfileDataService } from '../../../services/user-profile-data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  btnState = 'valid';
  loading: boolean = false;
  changeErrorMsg: string = null;

  setErrors = FormHelper.setErrors

  constructor(private userProfileDataService: UserProfileDataService,
    private snackBarService: SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  passwordForm: FormGroup = new FormGroup({
    current_password: new FormControl(null, CustomValidators.required('Current password is required')),
    new_password: new FormControl(null, CustomValidators.required('New password is required'))
  })

  ngOnInit(): void {

  }

  getButtonState() {
    if (this.passwordForm.invalid) return 'invalid';
    if (this.loading) return 'loading'
  }

  changePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    this.userProfileDataService.changePassword(this.passwordForm.value.current_password, this.passwordForm.value.new_password).subscribe(
      (r: BackendResponse<any>) => {
        this.snackBarService.success(r.message),
          this.router.navigate(['../'], { relativeTo: this.activatedRoute })
      },
      (err: BackendErrorResponse) => { this.loading = false; this.setErrors(this.passwordForm, err) }
    )
  }
}
