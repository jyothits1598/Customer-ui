import { Directive, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';

@Directive({
  selector: '[disableBodyScroll]'
})
export class DisableBodyScrollDirective implements OnInit, OnDestroy {

  constructor(private lS: LayoutService) { }
  
  ngOnInit(): void {
    console.log('directive on init called');
    this.lS.disableScroll();
  }
  
  ngOnDestroy(): void {
    this.lS.resetScroll();
  }
}
