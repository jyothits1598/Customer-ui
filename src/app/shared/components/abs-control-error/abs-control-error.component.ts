import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-abs-control-error',
  templateUrl: './abs-control-error.component.html',
  styleUrls: ['./abs-control-error.component.scss']
})
export class AbsControlErrorComponent implements OnInit {
  @Input() control: AbstractControl;

  getErrors() {
    return Object.values(this.control.errors)[0];
  }
  constructor() { }

  ngOnInit(): void {
  }

}
