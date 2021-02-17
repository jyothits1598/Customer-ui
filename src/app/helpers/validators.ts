import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { BackendErrorResponse } from '../core/model/backend-resp';

export class CustomValidators {
    static required(errorMsg: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return control.value ? null : { required: errorMsg };
        };
    }

    static pattern(regExp: RegExp, errorMsg: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const valid = regExp.test(control.value && control.value.replace(/\s/g, ''));
            return valid ? null : { pattern: errorMsg }
        };
    }

    static email(errorMsg: string) {
        return (control: AbstractControl): { [key: string]: any } => {
            const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
            return valid ? null : { pattern: errorMsg }
        };
    }

    static mobileNumber(errorMsg: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return control.value ? null : { required: errorMsg };
        };
    }
}

export class FormHelper {
    static setErrors(fc: FormGroup, eResp: BackendErrorResponse) {
        for (const key in eResp.errors) {
            if (Object.prototype.hasOwnProperty.call(eResp.errors, key)) {
                const c: AbstractControl = fc.controls[key];
                if (c) c.setErrors({ backend: (eResp.errors[key])[0] })
            }
        }
    }
}



// export function Required(errorMsg: string): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } => {
//         return control.value ? null : { required: errorMsg };
//     };
// }