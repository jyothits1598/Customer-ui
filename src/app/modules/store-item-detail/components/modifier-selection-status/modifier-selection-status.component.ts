import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'modifier-selection-status',
  templateUrl: './modifier-selection-status.component.html',
  styleUrls: ['./modifier-selection-status.component.scss'],
  animations: [
    trigger('selectionState',
      [
        state('unTouched', style({
          backgroundColor: 'grey'
        })),
        state('valid', style({
          backgroundColor: 'green'
        })),
        state('inValid', style({
          backgroundColor: 'red'
        })),
        transition('unTouched => valid', animate('1s'))
      ])
  ]
})
export class ModifierSelectionStatusComponent implements OnChanges {

  @Input() status: { touched: boolean, valid: boolean }
  animationState: string;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.animationState = this.getState;
  }

  get getState() {
    if (!this.status.touched) return 'unTouched';
    return this.status.valid ? 'valid' : 'inValid';
  }

  ngOnInit(): void {
  }

}
