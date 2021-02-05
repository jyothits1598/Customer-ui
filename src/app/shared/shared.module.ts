import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from './directives/popover.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { LazyImageDirective } from './directives/lazy-image.directive';
import { StateBtnComponent } from './components/state-btn/state-btn.component';
import { DisableBodyScrollDirective } from './directives/disable-body-scroll.directive';



@NgModule({
  declarations: [PopoverDirective, InfiniteScrollDirective, LazyImageDirective, StateBtnComponent, DisableBodyScrollDirective],
  imports: [
    CommonModule,
  ],
  exports: [PopoverDirective, InfiniteScrollDirective, StateBtnComponent, DisableBodyScrollDirective]
})
export class SharedModule { }
