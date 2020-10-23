import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { URL_login } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { CustomValidators } from 'src/app/modules/helpers/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggingIn: boolean = false;
  backendErrorMessage: string;
  constructor(private restApiService: RestApiService) { }

  ngOnInit(): void {

  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      CustomValidators.required('Please enter a registered email.'),
      CustomValidators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email.')
    ]),
    password: new FormControl('', CustomValidators.required('Please enter a password.'))
  })

  returnErrors(controlName: string) {
    return Object.values(this.loginForm.controls[controlName].errors)[0];
  }

  login() {
    // this.loginForm.setErrors()
    console.log('called login ', this.loginForm.value);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
    this.loggingIn = true;
    this.restApiService.post(URL_login, this.loginForm.value).pipe(finalize(() => this.loggingIn = false)).subscribe(
      (s) => { console.log("successfully logged in", s) },
      (e) => { this.handleErrors(e) }
    )
  }

  handleErrors(error: any) {
    console.log('inside handle errors', error);
    if (error.error) {
      if (error.error.email) {
        this.loginForm.controls.email.setErrors({ 'backend': error.error.email });
        return;
      }
      if (error.error.password) {
        this.loginForm.controls.password.setErrors({ 'backend': error.error.password })
        return;
      }
      if (error.error.error_msg) this.backendErrorMessage = error.error.error_msg;
    }
  }

}
