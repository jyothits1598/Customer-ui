import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[inViewPort]'
})
export class InViewPortDirective implements OnInit, OnDestroy {
  intersectionObserver: IntersectionObserver;
  @Output() inView = new EventEmitter<boolean>();

  constructor(private hostElement: ElementRef) { }
  ngOnInit(): void {
    const config = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
    this.intersectionObserver = new IntersectionObserver((e: IntersectionObserverEntry[]) => {
      this.inView.emit(e[0].isIntersecting);
    }, config);

    this.intersectionObserver.observe(this.hostElement.nativeElement);
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect();
  }

}
