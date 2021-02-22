import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BackendErrorResponse } from 'src/app/core/model/backend-resp';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators, FormHelper } from 'src/app/helpers/validators';
import { PasswordConfirmationGuard } from '../../../guards/password-confirmation.guard';

@Component({
  selector: 'app-current-password',
  templateUrl: './current-password.component.html',
  styleUrls: ['./current-password.component.scss']
})
export class CurrentPasswordComponent implements OnInit, OnDestroy {
  redirectUrl: string = null;
  errorRespMsg: string = null;
  loading: boolean = false;
  unSub$ = new Subject<true>()
  ischangeE: boolean = false;
  ischangeM: boolean = false;

  isEmail: boolean = false;
  isMobiletext: boolean = false;
  passwordForm: FormGroup = new FormGroup({
    current_password: new FormControl(null, CustomValidators.required('Password is required.'))
  })

  setErrors = FormHelper.setErrors;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private passwordConfGuard: PasswordConfirmationGuard) { }

  ngOnInit(): void {
    this.ischangeE = this.router.url.includes('change-email');
    this.ischangeM = this.router.url.includes('change-mobile');
    this.redirectUrl = this.activatedRoute.snapshot.queryParams.redirect;
  }

  confirmPassword() {
    //error highlight on enter
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.confirmPassword(this.passwordForm.value.current_password).pipe(finalize(() => this.loading = false)).subscribe(
      () => {
        this.passwordConfGuard.passwordConfirmed = true;
        if (this.redirectUrl) this.router.navigateByUrl(this.redirectUrl)
      },
      (errorResp: BackendErrorResponse) => { console.log(errorResp);this.setErrors(this.passwordForm, errorResp) }
    );
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
  }

}
