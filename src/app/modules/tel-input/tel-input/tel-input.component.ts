import { getParseErrors } from '@angular/compiler';
import { AfterViewInit, Component, OnDestroy, OnInit, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidatorFn } from '@angular/forms';
import { NgxIntlTelInputComponent, NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss']
})
export class TelInputComponent implements OnInit, AfterViewInit, ControlValueAccessor, OnDestroy {
  @ViewChild('ngxPhone', { read: NgxIntlTelInputComponent }) ngxPhone: NgxIntlTelInputComponent

  phoneControl: FormControl = new FormControl(null);
  changeSubs: Subscription;


  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }
  ngAfterViewInit(): void {
    this.ngxPhone.onTouched = () => { this.onTouched() }
  }

  ngOnInit(): void {
    this.changeSubs = this.phoneControl.valueChanges.subscribe(() => {
      this.onChange(this.phoneControl.value?.internationalNumber.replaceAll(/\s/g,''));
    })

    //updating validators
    let existingValidators: ValidatorFn = this.controlDir.control.validator;
    let phoneValidator = (control: AbstractControl) => { return this.phoneControl.errors ? { invalid: "Please enter a valid mobile number." } : null }

    this.controlDir.control.setValidators([existingValidators, phoneValidator]);
    this.controlDir.control.updateValueAndValidity();

  }

  ngOnDestroy(): void {
    this.changeSubs.unsubscribe();
  }

  debug() {
  }

  //controlvalue inplelemtation

  onChange = (value) => { };
  onTouched: () => {};
  writeValue(obj: any): void {
    this.phoneControl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
}
