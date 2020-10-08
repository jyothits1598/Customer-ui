import { Directive, ElementRef, EventEmitter, OnDestroy, Renderer2, ViewContainerRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Directive({
  selector: '[infiniteScroll]',
  exportAs: 'infiniteScroll'
})
export class InfiniteScrollDirective implements OnDestroy {
  intersectionObserver: IntersectionObserver;
  scrolled = new EventEmitter<any>();
  intersectionSubject$ = new Subject<any>();
  subs: Subscription;

  config = {
    root: null, // avoiding 'root' or setting it to 'null' sets it to default value: viewport
    rootMargin: '0px',
    threshold: 0
  }

  constructor(private hostElement: ElementRef,
  ) {
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection.bind(this), this.config);
    this.intersectionObserver.observe(this.hostElement.nativeElement);
    this.subs = this.intersectionSubject$.subscribe(
      () => this.scrolled.emit(true)
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
