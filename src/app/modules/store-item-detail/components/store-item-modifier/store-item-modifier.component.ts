import { Component, ElementRef, forwardRef, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { ItemModifier } from '../../model/store-item-detail';
import { ItemModifierFormControlComponent } from '../item-modifier-form-control.component';

@Component({
  selector: 'store-item-modifier',
  templateUrl: './store-item-modifier.component.html',
  styleUrls: ['./store-item-modifier.component.scss'],
})
export class StoreItemModifierComponent extends ItemModifierFormControlComponent implements OnChanges, ControlValueAccessor {
  optionControls: FormArray;
  disabledExcess: boolean = false;

  constructor(@Self() public controlDir: NgControl,
    private e: ElementRef) {
    super(controlDir, e);
    this.controlDir.valueAccessor = this;
  }

  isValid(): boolean {
    return this.optionControls.valid;
  }

  ngOnChanges(changes: SimpleChanges): void {
    let controls: Array<FormControl> = this.modifier.options.map(opt => { return new FormControl(false) });
    this.optionControls = new FormArray(controls, [this.minNumberValidator(this.modifier.minSelection)]);
    // this.optionControls.setValidators(this.minMaxNumberValidator(this.modifier.minSelection, this.modifier.maxSelection));
    this.setupAccessor(this.optionControls);
  }

  handleChange() {
    this.selections = [...this.optionControls.value]
      .map((value, index) => value ? this.modifier.options[index] : value)
      .filter(value => value);
    let modifer = { ...this.modifier };
    modifer.options = this.selections;
    this.onChange(modifer);
    this.onTouched();
    this.enableDisableForm();
  }

  //disable form if max options have been selected, enable if max not selected
  enableDisableForm() {
    if (this.selections.length === this.modifier.maxSelection) {
      this.optionControls.controls.forEach(c => { if (!c.value) { c.disable(); this.disabledExcess = true; } })
    } else {
      if (this.disabledExcess) {
        this.optionControls.controls.forEach(c => { if (c.disabled) c.enable() })
        this.disabledExcess = false;
      }
    }
  }

  getColor() {
    if (this.optionControls.touched && this.optionControls.invalid) return 'red';
    if (this.optionControls.invalid) return 'blue';
    return 'green';
  }


  // minMaxNumberValidator(min: number, max: number): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     let length = [...control.value].filter(val => val).length;
  //     if (length < min) return { 'Minimum': 'Minimum not satisfied' }
  //     if (length > max) return { 'Maximim': 'Limit exceeded' }
  //     return null;
  //   };
  // }

  minNumberValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if ([...control.value].filter(val => val).length < min) return { 'Minimum': 'Minimum not satisfied' }
      return null;
    };
  }
}
