import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URL_signup } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { APP_LINK } from 'src/environments/environment';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  submitting: boolean = false;
  submissionError: string;
  submissionComplete: boolean = false;

  constructor(
    private restApiService: RestApiService,
    private router: Router,
    private snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', CustomValidators.required('First name is required.')),
      lastName: new FormControl('', CustomValidators.required('Last name is required.')),
      customerEmail: new FormControl(null, [
        CustomValidators.required('Email is required.'),
        CustomValidators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Email is incorrect')
      ]),
      signupmobile: new FormControl('', [
        CustomValidators.required('Mobile number is required.'),
        CustomValidators.pattern(/[0-9]{10}/, 'Mobile number in incorrect')
      ]),
      password: new FormControl('', [
        CustomValidators.required('Password is required.'),
        CustomValidators.pattern(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, 'Please enter a more secure password')
      ])
    });
  }

  get f() { return this.registerForm.controls; }

  getErrors(controlName: string) {
    return Object.values(this.registerForm.controls[controlName].errors)[0];
  }

  onSubmit() {
    this.submissionError = null;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    let data: any = {
      first_name: this.registerForm.value.firstName,
      last_name: this.registerForm.value.lastName,
      email: this.registerForm.value.customerEmail,
      password: this.registerForm.value.password,
      mobile_number: this.registerForm.value.signupmobile,
      next_url: APP_LINK + 'verify',
      login_link: "http://localhost:4200/login",
      contactus_link: "http://localhost:4200/login"
    };

    this.restApiService.post(URL_signup, data).pipe(finalize(() => this.submitting = false)).subscribe(
      // () => { this.submissionComplete = true; },
      (resp) => {
        this.submissionComplete = true;
        this.snackBar.success(resp.data);
        this.router.navigateByUrl('/');
      },
      (resp) => {
        if (resp.error?.error_msg) this.snackBar.error(resp.error?.error_msg);
        else
          // this.submissionError = 'An error has occured. Please try again later';
          this.snackBar.error('An error has occured. Please try again later');
      }
    )
  }

  handleFacebookSignin() {

  }

  handleError(error: any) {
    console.log('encountered an error', error);
  }

  // patternValidator(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     if (!control.value) {
  //       return null;
  //     }
  //     // const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
  //     const regex = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$');
  //     const valid = regex.test(control.value);
  //     return valid ? null : { invalidPassword: true };
  //   };
  // }
}
