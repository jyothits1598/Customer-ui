import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverDirective } from './directives/popover.directive';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { LazyImageDirective } from './directives/lazy-image.directive';
import { StateBtnComponent } from './components/state-btn/state-btn.component';
import { DisableBodyScrollDirective } from './directives/disable-body-scroll.directive';
import { InViewPortDirective } from './directives/in-view-port.directive';
import { ExpandableDirective } from './directives/expandable.directive';



@NgModule({
  declarations: [PopoverDirective, InfiniteScrollDirective, LazyImageDirective, StateBtnComponent, DisableBodyScrollDirective, InViewPortDirective, ExpandableDirective],
  imports: [
    CommonModule,
  ],
  exports: [PopoverDirective, InfiniteScrollDirective, StateBtnComponent, DisableBodyScrollDirective, InViewPortDirective, ExpandableDirective]
})
export class SharedModule { }
