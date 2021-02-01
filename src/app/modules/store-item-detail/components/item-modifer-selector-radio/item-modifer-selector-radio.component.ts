import { Component, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/validators';
import { ItemModifier, ModifierOption } from '../../model/store-item-detail';

@Component({
  selector: 'item-modifer-selector-radio',
  templateUrl: './item-modifer-selector-radio.component.html',
  styleUrls: ['./item-modifer-selector-radio.component.scss']
})
export class ItemModiferSelectorRadioComponent implements OnChanges, ControlValueAccessor {
  @Input() modifier: ItemModifier;
  selections: Array<ModifierOption> = [];
  optionControl: FormControl;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optionControl = new FormControl(null, [CustomValidators.required('This option is required')]);
    this.setupAccessor();
  }

  setupAccessor() {
    this.controlDir.control.validator = () => this.optionControl.valid ? null : { invalid: true };
    this.controlDir.control.markAsTouched = () => this.optionControl.markAsTouched();
    this.controlDir.control.updateValueAndValidity();
  }

  handleChange() {
    this.selections = this.modifier.options.filter((o) => o.id === this.optionControl.value);
    this.onChange(this.selections);
  }

  // **Control value accessor**
  onChange = (value) => { };
  onTouched: (value) => {};

  validate(c: FormControl) {
    return this.optionControl.valid ? null : { invalid: true }
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

  markAsTouched() {
    console.log('mark as touched called');
    this.optionControl.markAsTouched();
  }

}
