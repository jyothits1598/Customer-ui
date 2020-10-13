import { Directive, ElementRef, EventEmitter, OnDestroy, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[infiniteScroll]',
  exportAs: 'infiniteScroll'
})
export class InfiniteScrollDirective implements OnDestroy {
  intersectionObserver: IntersectionObserver;
  @Output() scrolled = new EventEmitter<boolean>();
  intersectionSubject$ = new Subject<any>();
  subs: Subscription;

  config = {
    root: null, 
    rootMargin: '0px',
    threshold: 0
  }

  constructor(private hostElement: ElementRef,
  ) {
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), this.config);
    this.intersectionObserver.observe(this.hostElement.nativeElement);
    this.subs = this.intersectionSubject$.subscribe(
      () => { console.log('emmited value'); this.scrolled.emit(true) }
    );
  }
  ngOnDestroy(): void {
    this.dispose();
  }

  handleIntersection(entries: Array<IntersectionObserverEntry>, observer) {
    if (entries[0].isIntersecting) this.intersectionSubject$.next(entries);
  }

  dispose() {
    this.intersectionObserver.unobserve(this.hostElement.nativeElement);
    this.subs.unsubscribe();
  }

}
