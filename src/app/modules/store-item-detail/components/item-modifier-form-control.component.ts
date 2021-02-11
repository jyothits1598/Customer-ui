import { Component, ElementRef, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/validators';
import { ItemModifier, ModifierOption } from '../model/store-item-detail';

@Component({
  selector: 'app-item-modifier-form-control',
  template: ``,
  styles: [
  ]
})
export class ItemModifierFormControlComponent implements ControlValueAccessor {

  @Input() modifier: ItemModifier;
  selections: Array<ModifierOption> = [];

  constructor(@Self() public controlDir: NgControl,
    public elem: ElementRef) {
    this.controlDir.valueAccessor = this;
  }

  setupAccessor(c: AbstractControl) {
    this.controlDir.control.validator = () => c.valid ? null : { invalid: true };
    this.controlDir.control.markAsTouched = () => c.markAsTouched();
    this.controlDir.control.updateValueAndValidity();
  }

  // **Control value accessor**
  onChange = (value) => { };
  onTouched: () => {};

  validate(c: FormControl) {
    return c.valid ? null : { invalid: true }
  }

  // getColor() {
  //   if (this.optionControl.touched && this.optionControl.invalid) return 'red';
  //   if (this.optionControl.invalid) return 'blue';
  //   return 'green';
  // }
  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  // markAsTouched() {
  //   this.optionControl.markAsTouched();
  // }

}
