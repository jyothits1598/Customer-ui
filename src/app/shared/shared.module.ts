import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from './directives/popover.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';



@NgModule({
  declarations: [PopoverDirective, InfiniteScrollDirective],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [PopoverDirective, InfiniteScrollDirective]
})
export class SharedModule { }
