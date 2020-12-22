import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from './directives/popover.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { LazyImageDirective } from './directives/lazy-image.directive';
import { StateBtnComponent } from './components/state-btn/state-btn.component';



@NgModule({
  declarations: [PopoverDirective, InfiniteScrollDirective, LazyImageDirective, StateBtnComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [PopoverDirective, InfiniteScrollDirective, StateBtnComponent]
})
export class SharedModule { }
