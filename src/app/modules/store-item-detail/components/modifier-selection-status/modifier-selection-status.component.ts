import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'modifier-selection-status',
  templateUrl: './modifier-selection-status.component.html',
  styleUrls: ['./modifier-selection-status.component.scss'],
  animations: [
    trigger('selectionState',
      [
        state('unTouched', style({
          backgroundColor: 'rgb(255, 191, 66)',
        })),
        state('valid', style({
          backgroundColor: '#c0ffc8'
        })),
        // state('valid', query()),
        state('inValid', style({
          backgroundColor: 'red',
          color: 'white'
        })),
        // transition('* => *', [
        //   animate('.5s'),
        //   query('.required__icon--success',
        //     [
        //       animate('.5s', style({ width: '20px' }))
        //     ])
        // ],
        // )
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
    if(this.status.valid) return 'valid';
    if (!this.status.touched) return 'unTouched';
    return 'inValid'
  }

  ngOnInit(): void {
  }

}
