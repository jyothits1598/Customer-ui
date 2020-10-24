import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
    static required(errorMsg: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            return control.value ? null : { required: errorMsg };
        };
    }

    static pattern(regExp: RegExp, errorMsg: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const valid = regExp.test(control.value);
            return valid ? null : { pattern: errorMsg }
        };
    }
}



// export function Required(errorMsg: string): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } => {
//         return control.value ? null : { required: errorMsg };
//     };
// }