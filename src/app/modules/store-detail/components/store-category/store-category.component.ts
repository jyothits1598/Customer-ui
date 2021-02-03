import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { StoreCategory } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.scss']
})
export class StoreCategoryComponent implements OnInit, AfterViewInit {
  @Input() categories: Array<StoreCategory>;
  @Input() scrolledDown: boolean;
  @ViewChildren('categorySections') sections: QueryList<ElementRef>;

  visibleDivs: Array<HTMLElement> = [];

  intersectionObserver: IntersectionObserver;
  currentCategory: StoreCategory;
  pauseObservation: boolean;

  constructor(private window: Window) { }

  ngAfterViewInit(): void {
    this.initiateObservation();
  }
  ngOnInit(): void {
    this.currentCategory = this.categories[0];
  }

  handleTabClick(index: number) {
    // this.pauseObservation = true;
    // this.currentCategory = this.categories[index];
    // this.sections.toArray()[index].nativeElement.scrollIntoView(false);
    // setTimeout(() => {
    //   this.pauseObservation = false;
    // }, 500);
    this.pauseObservation = true;
    this.currentCategory = this.categories[index];
    let elem: HTMLElement = this.sections.toArray()[index].nativeElement;
    let distance = this.getPosition(elem);
    this.window.scrollTo(
      0,
      (distance - 130),
    );
    setTimeout(() => {
      this.pauseObservation = false;
    }, 500);
  }

  getPosition(element: any) {
    var yPosition = 0;

    while (element) {
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      element = element.offsetParent;
    }

    return yPosition;
  }

  initiateObservation() {
    let arry = this.sections.map(s => (<HTMLElement>s.nativeElement).getBoundingClientRect().height);
    const maxHeight = Math.max(...arry);
    const maxIntesectionRatio = (window.innerHeight / maxHeight) - 0.01; // 0.01 - cusioning
    let config = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: maxIntesectionRatio < 1 ? maxIntesectionRatio : 1
    }
    this.intersectionObserver = new IntersectionObserver(this.handleInterSection.bind(this), config);

    this.sections.forEach(ne => this.intersectionObserver.observe(ne.nativeElement));
  }

  handleInterSection(e: IntersectionObserverEntry[]) {
    const atTop = this.atTop(e[0]);
    const currCatIndex = this.getCategoryIndex((<HTMLElement>e[0].target));
    if (e[0].isIntersecting) {
      this.currentCategory = this.categories[currCatIndex];
    } else {
      let currentIndex = this.categories.findIndex(c => c === this.currentCategory);
      if (Math.abs(currentIndex - currCatIndex) === 1) {
        if (atTop) {
          //leaving from top
          this.currentCategory = this.categories[currCatIndex + 1];
        } else {
          // leaving from bottom
          this.currentCategory = this.categories[currCatIndex - 1]
        }
      }
    }
  }

  getCategoryIndex(element: HTMLElement) {
    return parseInt(element.dataset.categoryIndex);
  }

  atBottom(e: IntersectionObserverEntry) {
    return e.boundingClientRect.top === e.intersectionRect.top;
  }

  atTop(e: IntersectionObserverEntry) {
    return e.boundingClientRect.top < e.intersectionRect.top;
  }

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
