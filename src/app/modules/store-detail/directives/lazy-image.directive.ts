import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[lazyImage]'
})
export class LazyImageDirective implements OnInit {
  @Input() imageUrl: string;

  constructor(private host : ElementRef) { }
  
  ngOnInit(): void {
    let observer = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        this.host.nativeElement.src = this.imageUrl;
        observer.unobserve(this.host.nativeElement);
      }
    });
    observer.observe(this.host.nativeElement)
  }
}
