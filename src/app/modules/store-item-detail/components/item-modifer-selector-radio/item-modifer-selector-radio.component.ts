import { Component, ElementRef, Input, OnChanges, OnInit, Self, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/validators';
import { ItemModifier, ModifierOption } from '../../model/store-item-detail';
import { ItemModifierFormControlComponent } from '../item-modifier-form-control.component';

@Component({
  selector: 'item-modifer-selector-radio',
  templateUrl: './item-modifer-selector-radio.component.html',
  styleUrls: ['./item-modifer-selector-radio.component.scss']
})
export class ItemModiferSelectorRadioComponent extends ItemModifierFormControlComponent implements OnChanges, ControlValueAccessor {
  optionControl: FormControl;

  constructor(@Self() public controlDir: NgControl,
    private e: ElementRef) {
    super(controlDir, e);
    this.controlDir.valueAccessor = this;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optionControl = new FormControl(null, [CustomValidators.required('This option is required')]);
    this.setupAccessor(this.optionControl);
  }

  // setupAccessor() {
  //   this.controlDir.control.validator = () => this.optionControl.valid ? null : { invalid: true };
  //   this.controlDir.control.markAsTouched = () => this.optionControl.markAsTouched();
  //   this.controlDir.control.updateValueAndValidity();
  // }

  handleChange() {
    this.selections = this.modifier.options.filter((o) => o.id === this.optionControl.value);

    let modifer = { ...this.modifier };
    modifer.options = this.selections;
    this.onChange(modifer);
  }

  isValid(): boolean {
    return this.optionControl.valid;
  }

}
