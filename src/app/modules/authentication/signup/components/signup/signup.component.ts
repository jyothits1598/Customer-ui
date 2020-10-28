import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { URL_signup } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';
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

  constructor(private restApiService: RestApiService,private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', CustomValidators.required('First name is Required.')),
      lastName: new FormControl('', CustomValidators.required('Last name is Required.')),
      customerEmail: new FormControl(null, [
        CustomValidators.required('Email is required.'),
        CustomValidators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Email is incorrect')
      ]),
      signupmobile: new FormControl('', [
        CustomValidators.required('Mobile number is Required.'),
        CustomValidators.pattern(/[0-9]{10}/, 'Mobile number in incorrect')
      ]),
      password: new FormControl('', [
        CustomValidators.required('Password is Required.'),
        CustomValidators.pattern(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, 'Please enter a more secure password')
      ])
    });

    //password configure
    // $('input[type=password]').keyup(function () {
    //   var password = $(this).val();
    //   if (password.length < 8) {
    //     $('#length').removeClass('valid').addClass('invalid');
    //   } else {
    //     $('#length').removeClass('invalid').addClass('valid');
    //   }
    //   if (password.match(/[a-z]/)) {
    //     $('#small').removeClass('invalid').addClass('valid');
    //   } else {
    //     $('#small').removeClass('valid').addClass('invalid');
    //   }
    //   if (password.match(/[A-Z]/)) {
    //     $('#capital').removeClass('invalid').addClass('valid');
    //   } else {
    //     $('#capital').removeClass('valid').addClass('invalid');
    //   }
    // }).focus(function () {
    //   $('#pswd_info').show();
    // })
    //   .blur(function () {
    //     $('#pswd_info').hide();
    //   });

    // eye icon
    // $(".toggle-password").click(function () {
    //   $(this).toggleClass("fa-eye fa-eye-slash");
    //   var input = $($(this).attr("toggle"));
    //   if (input.attr("type") == "password") {
    //     input.attr("type", "text");
    //   } else {
    //     input.attr("type", "password");
    //   }
    // });

  }

  //only number will be add
  // keyPress(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;

  //   let inputChar = String.fromCharCode(event.charCode);
  //   if (event.keyCode != 8 && !pattern.test(inputChar)) {
  //     event.preventDefault();
  //   }
  // }

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
      () => { this.submissionComplete = true; },
      (resp) => {
        if (resp.error?.error_msg) this.submissionError = resp.error.error_msg;
        else this.submissionError = 'An error has occured. Please try again later';
      }
    )
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
