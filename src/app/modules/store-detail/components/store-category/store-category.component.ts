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
  @ViewChild('intersectionDiv', { read: ElementRef }) intersectionDiv: ElementRef;

  intersectionObserver: IntersectionObserver;
  selectedTab: string;

  constructor() { }

  ngAfterViewInit(): void {
    this.initiateObservation();
  }

  ngOnInit(): void {
    this.selectedTab = this.categories[0].name;
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
    // if (this.categories.length > 0) {
    // setTimeout(() => {
    this.intersectionObserver = new IntersectionObserver(this.handleInterSection.bind(this), config);

    this.sections.forEach(ne => this.intersectionObserver.observe(ne.nativeElement))
    // }, 0);
    // }
  }

  handleInterSection(e: IntersectionObserverEntry[], observer: IntersectionObserver) {
    console.log('intersection read ', e[0].isIntersecting, e[0].target);
    for (let i = 0; i < e.length; i++) {
      if (e[i].isIntersecting) { this.selectedTab = e[i].target.id; return; }
    }
  }
}
