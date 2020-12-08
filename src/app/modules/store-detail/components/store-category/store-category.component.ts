import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StoreCategory } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.scss']
})
export class StoreCategoryComponent implements OnInit, AfterViewInit {
  @Input() categories: Array<StoreCategory>;
  @ViewChildren('categorySections') sections: QueryList<ElementRef>;

  intersectionObserver: IntersectionObserver;
  currentCategory: StoreCategory;

  constructor() { }

  ngAfterViewInit(): void {
    this.initiateObservation();
  }

  ngOnInit(): void {
    this.currentCategory = this.categories[0];
  }


  handleTabClick(index: number) {
    this.sections.toArray()[index].nativeElement.scrollIntoView({});
  }

  initiateObservation() {
    let config = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 0.75
    }
    this.intersectionObserver = new IntersectionObserver(this.handleInterSection.bind(this), config);

    this.sections.forEach(ne => this.intersectionObserver.observe(ne.nativeElement))
  }

  handleInterSection(e: IntersectionObserverEntry[], observer: IntersectionObserver) {
    if (this.atBottom(e[0])) {
      if (e[0].isIntersecting) this.currentCategory = this.categories[this.getCategoryIndex((<HTMLElement>e[0].target))];
      else this.currentCategory = this.categories[this.getCategoryIndex((<HTMLElement>e[0].target)) - 1]
    }

  }

  getCategoryIndex(element: HTMLElement) {
    return parseInt(element.dataset.categoryIndex);
  }

  atBottom(e: IntersectionObserverEntry) {
    return e.boundingClientRect.top == e.intersectionRect.top;
  }

  // atTop(e: IntersectionObserverEntry) {
  //   return e.boundingClientRect.top < e.intersectionRect.top;
  // }

  // if(this.atTop(e[0])){
  //   if(e[0].isIntersecting) console.log('entered from top')
  //   else console.log('leaving from top')
  // }else{
  //   if(e[0].isIntersecting) console.log('entered from bottom')
  //   else console.log('leaving from bottom')
  // } 
  // for (let i = 0; i < e.length; i++) {
  //   if (e[i].isIntersecting) { this.currentCategory =  this.categories[this.getCategoryIndex((<HTMLElement>e[0].target))];return; }
  // }

  //   if(e[0].isIntersecting && this.atBottom(e[0])) this.currentCategory = this.categories[this.getCategoryIndex((<HTMLElement>e[0].target))];
  //     else {
  //   if (this.atBottom(e[0])) this.currentCategory = this.categories[this.getCategoryIndex((<HTMLElement>e[0].target)) - 1]
  // }

}
