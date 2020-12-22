import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonState } from '../../model/ButtonState';

@Component({
  selector: 'state-btn',
  templateUrl: './state-btn.component.html',
  styleUrls: ['./state-btn.component.scss'],
  animations: [
    // trigger('stateBtn', [
    //   state('valid', style({
    //     backgroundColor: 'white'
    //   })),
    //   state('loading', style({
    //     filter: 'opacity(0.5)'
    //   })),
    //   transition('valid=>loading', [
    //     query(':leave', [
    //       // animate('.2s', style({ transform: 'translateY(58px)' })),
    //       animate(".2s", keyframes([
    //         style({ transform: 'translateY(58px)' }),
    //         // style({ transform: 'translateY(0px)' })
    //       ]))
    //     ]),
    //     query(':enter', [
    //       // animate('.2s', style({ transform: 'translateY(58px)' })),
    //       style({ transform: 'translateY(58px)' }),
    //       // animate(".5s", keyframes([
    //       //   style({ transform: 'translateY(58px)' }),
    //       //   style({ transform: 'translateY(0px)' })
    //       // ]))
    //       animate(".2s", style({transform: 'translateY(0px)'}))
    //     ]),
    //   ])
    // ])
  ]
})
export class StateBtnComponent implements AfterViewInit, OnChanges {
  @Input() state: ButtonState;
  @Input() disabled: boolean;
  @Input() defaultText: string;
  @Input() successText: string;

  @ViewChild('btn', { read: ElementRef }) btnElem: ElementRef;
  @ContentChild('success', { read: ElementRef }) successElem: ElementRef;
  constructor(private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    console.log('state btn after init just ran, ', this.successElem);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onchanges just ran, ', changes);
  }

  render() {

  }

}
