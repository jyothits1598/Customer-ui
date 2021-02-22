import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
import { ReadUserDetails } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators, FormHelper } from 'src/app/helpers/validators';
import { UserProfileDataService } from '../../../services/user-profile-data.service';

@Component({
  selector: 'app-change-mobile',
  templateUrl: './change-mobile.component.html',
  styleUrls: ['./change-mobile.component.scss']
})
export class ChangeMobileComponent implements OnInit, OnDestroy {
  errorMessage;
  loading: boolean = false;
  isaddM: boolean = false;
  ischangeM: boolean = false;

  unSub$ = new Subject<true>();
  setError = FormHelper.setErrors;

  constructor(
    private userProfileDataService: UserProfileDataService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sb: SnackBarService
  ) { }

  ngOnInit(): void {
    this.isaddM = this.router.url.includes('add-mobile');
    this.ischangeM = this.router.url.includes('change-mobile');
  }

  changeForm: FormGroup = new FormGroup({
    mobile_number: new FormControl(null, [
      CustomValidators.required('Mobile number is required.'),
    ]),
    mobile_token: new FormControl(null, [
      CustomValidators.required('Please enter verification code'),
    ])
  })

  getErrors(controlName: string) {
    return Object.values(this.changeForm.controls[controlName].errors)[0];
  }

  changeMobile() {
    //error highlight on enter
    this.changeForm.markAllAsTouched();
    if (this.changeForm.invalid) {
      return;
    }
    this.loading = true;
    this.userProfileDataService.changeMobile(this.changeForm.value.mobile_number, this.changeForm.value.mobile_token).pipe(takeUntil(this.unSub$)).subscribe(
      (u) => { this.authService.updateUser(ReadUserDetails(u.data)); this.sb.success(u.message); this.router.navigate(['../'], { relativeTo: this.route }) },
      (err: BackendErrorResponse) => { this.loading = false; this.setError(this.changeForm, err) }
    )
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
  }
}
