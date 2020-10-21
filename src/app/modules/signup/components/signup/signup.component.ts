import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      customerEmail: new FormControl(null, [Validators.required, Validators.email]),
      signupmobile: new FormControl('', [Validators.required, Validators.pattern("^((\\+61-?)|0)?[0-9]{10}$")]),
      password: new FormControl('', [Validators.required, this.patternValidator()]),
    });

    //password configure
    $('input[type=password]').keyup(function () {
      var password = $(this).val();
      if (password.length < 8) {
        $('#length').removeClass('valid').addClass('invalid');
      } else {
        $('#length').removeClass('invalid').addClass('valid');
      }
      if (password.match(/[a-z]/)) {
        $('#small').removeClass('invalid').addClass('valid');
      } else {
        $('#small').removeClass('valid').addClass('invalid');
      }
      if (password.match(/[A-Z]/)) {
        $('#capital').removeClass('invalid').addClass('valid');
      } else {
        $('#capital').removeClass('valid').addClass('invalid');
      }
    }).focus(function () {
      $('#pswd_info').show();
    })
      .blur(function () {
        $('#pswd_info').hide();
      });

    // eye icon
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

  }

  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.valid) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      // const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const regex = new RegExp('^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
