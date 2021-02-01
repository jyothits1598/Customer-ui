import { Component, forwardRef, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';
import { ItemModifier } from '../../model/store-item-detail';

@Component({
  selector: 'store-item-modifier',
  templateUrl: './store-item-modifier.component.html',
  styleUrls: ['./store-item-modifier.component.scss'],
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => StoreItemModifierComponent),
    //   multi: true,
    // },
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => StoreItemModifierComponent),
    //   multi: true,
    // }
  ]
})
export class StoreItemModifierComponent implements OnChanges, ControlValueAccessor {
  @Input() modifier: ItemModifier;
  selections = [];
  optionControls: FormArray;
  disabledExcess: boolean = false;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }


  setupAccessor() {
    this.controlDir.control.validator = () => this.optionControls.valid ? null : { invalid: true };
    this.controlDir.control.markAsTouched = () => this.optionControls.markAsTouched();
    this.controlDir.control.updateValueAndValidity();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    let controls: Array<FormControl> = this.modifier.options.map(opt => { return new FormControl(false) });
    this.optionControls = new FormArray(controls, [this.minNumberValidator(this.modifier.minSelection)]);
    // this.optionControls.setValidators(this.minMaxNumberValidator(this.modifier.minSelection, this.modifier.maxSelection));
    this.setupAccessor();
  }

  handleChange() {
    this.selections = [...this.optionControls.value]
      .map((value, index) => value ? this.modifier.options[index] : value)
      .filter(value => value);
    this.onChange(this.selections);

    this.enableDisableForm();
  }

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


  // **Control value accessor**
  onChange = (value) => { };
  onTouched: (value) => {};

  validate(c: FormControl) {
    return this.optionControls.valid ? null : { invalid: true }
  }
  writeValue(obj: any): void {

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

  markAsTouched() {
    this.optionControls.markAllAsTouched();
  }
}
