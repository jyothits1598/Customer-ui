import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Directive({
  selector: '[appExpandable]',
  exportAs: 'appExpadable'
})
export class ExpandableDirective implements OnChanges {
  _expanded: boolean;
  //size in px

  @Input() collapsedSize: number;

  get isExpanded() {
    return this._expanded;
  }


  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private sServ: ScrollService) {
    this.r.setStyle(this.el.nativeElement, 'overflow-y', 'hidden');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change(false);
  }

  toggle() {
    this.change(!this._expanded);
  }

  change(expand: boolean) {
    if (expand) {
      this._expanded = true;
      // const unlisten = this.r.listen(this.el.nativeElement, 'transitionend', () => { unlisten(); });
      this.r.setStyle(this.el.nativeElement, 'max-height', this.el.nativeElement.scrollHeight + 'px');
    } else {
      // console.log('contract called', expand)
      this._expanded = false;
      this.r.setStyle(this.el.nativeElement, 'max-height', (this.collapsedSize || 0) + 'px');
    }
  }

  isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }



}
