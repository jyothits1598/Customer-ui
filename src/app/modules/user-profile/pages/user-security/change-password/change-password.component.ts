import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
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

  constructor(private userProfileDataService: UserProfileDataService,
    private snackBarService: SnackBarService,
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  passwordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, CustomValidators.required('Current password is required')),
    newPassword: new FormControl(null, CustomValidators.required('New password is required'))
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

    this.userProfileDataService.changePassword(this.passwordForm.value.currentPassword, this.passwordForm.value.newPassword).subscribe(
      () => {
        this.snackBarService.success('Password changed successfully.'),
          this.router.navigate(['../'], {relativeTo: this.activatedRoute})
      },
      // (error) => { this.changeErrorMsg = error.error_msg[0]; this.loading = false; }
      (err) => { this.loading = false; this.handleError(err) }
    )
  }

  handleError(errorResp) {
    if (errorResp.error.error_msg) this.changeErrorMsg = errorResp.error.error_msg[0];
  }
}
