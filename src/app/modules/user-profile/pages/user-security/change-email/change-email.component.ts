import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
import { ReadUserDetails } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators, FormHelper } from 'src/app/helpers/validators';
import { UserProfileDataService } from '../../../services/user-profile-data.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit, OnDestroy {
  errorMessage;
  loading: boolean = false;
  isaddE: boolean = false;
  ischangeE: boolean = false;

  setError = FormHelper.setErrors;

  unSub$ = new Subject<true>();
  constructor(
    private userProfileDataService: UserProfileDataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService, private sb: SnackBarService
  ) { }

  ngOnInit(): void {
    this.isaddE = this.router.url.includes('add-email');
    this.ischangeE = this.router.url.includes('change-email');
  }

  changeForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      CustomValidators.required('Email is required.'),
      CustomValidators.email('Email is invalid.')
    ]),
    email_token: new FormControl(null, [
      CustomValidators.required('Please enter verification code'),
    ])
  })

  changeEmail() {
    //error highlight on enter
    this.changeForm.markAllAsTouched();
    if (this.changeForm.invalid) {
      return;
    }
    this.loading = true;
    this.userProfileDataService.changeEmail(this.changeForm.value.email, this.changeForm.value.email_token).pipe(takeUntil(this.unSub$)).subscribe(
      (resp) => { this.authService.updateUser(ReadUserDetails(resp.data)); this.sb.success(resp.message); this.router.navigate(['../'], { relativeTo: this.route }) },
      (err: BackendErrorResponse) => { this.loading = false; this.setError(this.changeForm, err); }
    )
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
  }

}
