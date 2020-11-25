import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { StoreCategory } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.scss']
})
export class StoreCategoryComponent implements OnInit {
  @Input() categories: Array<StoreCategory>;
  @ViewChildren('categorySections') sections: QueryList<ElementRef>;

  intersectionObserver: IntersectionObserver;
  selectedTab: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedTab = this.categories[0].name;
    this.initiateObservation();
  }


  handleTabClick(index: number) {
    this.sections.toArray()[index].nativeElement.scrollIntoView();
  }

  initiateObservation() {
    let config = {
      root: null,
      rootMargin: '0px',
      threshold: 0.75
    }
    if (this.categories.length > 0) {

      setTimeout(() => {
        this.intersectionObserver = new IntersectionObserver((e) => {
          for (let i = 0; i < e.length; i++) {
            if (e[i].isIntersecting) { this.selectedTab = e[i].target.id; return; }
          }
        }, config);

        this.sections.forEach(ne => this.intersectionObserver.observe(ne.nativeElement))
      }, 0);
    }
  }

}
