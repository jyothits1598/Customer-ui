import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { PasswordConfirmationGuard } from '../../../guards/password-confirmation.guard';

@Component({
  selector: 'app-current-password',
  templateUrl: './current-password.component.html',
  styleUrls: ['./current-password.component.scss']
})
export class CurrentPasswordComponent implements OnInit {
  redirectUrl: string = null;
  errorRespMsg: string = null;
  loading: boolean = false;

  isEmail: boolean = false;

  // current_url:string = "/current-password";
  // current_url_status:boolean = false;
  passwordForm: FormGroup = new FormGroup({
    password: new FormControl(null, CustomValidators.required('Password is required.'))
  })
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private passwordConfGuard: PasswordConfirmationGuard) {
    // this.router.events.subscribe(
    //   (event: any) => {
    //     if (event instanceof NavigationEnd) {
    //       this.current_url_status = false;
    //       if(this.router.url && this.router.url.indexOf(this.current_url) > -1){
    //         this.current_url_status = true;
    //         console.log(this.current_url_status);
    //       }
    //     }
    //   }
    // );
  }

  ngOnInit(): void {
    // console.log(this.router.url);
    this.isEmail = this.router.url.includes('change-email')
    this.redirectUrl = this.activatedRoute.snapshot.queryParams.redirect;
  }

  confirmPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.confirmPassword(this.passwordForm.value.password).subscribe(
      () => {
        this.passwordConfGuard.passwordConfirmed = true;
        if (this.redirectUrl) this.router.navigateByUrl(this.redirectUrl)
      },
      (errorResp) => { this.errorRespMsg = errorResp.error.error_msg[0]; this.loading = false; }
    );
  }

}
