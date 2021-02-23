import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { HomeService } from '../../home.service';
import { Cuisines } from '../../modal/cuisines';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.scss']
})
export class FilterCategoriesComponent implements OnInit, OnDestroy, AfterViewInit {
  right: boolean = true;
  cuisines = new Array<Cuisines>();
  unSub$ = new Subject<true>();
  interObs = new IntersectionObserver(this.handleInterSection.bind(this));
  static_image_width = '?w=100,q=50,f=webp';
  leftActive: boolean = true;
  rightActive: boolean = true;

  constructor(
    private layoutService: LayoutService,
    private homeService: HomeService
  ) { }

  ngAfterViewInit(): void {
    this.interObs.observe(this.leftLimit.nativeElement);
      this.interObs.observe(this.rightLimit.nativeElement);
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
  }
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  @ViewChild('left') leftLimit: ElementRef;
  @ViewChild('right') rightLimit: ElementRef;

  scrollRight() {
    if (this.layoutService.isMobile) {
      this.widgetsContent.nativeElement.scrollLeft += 200;
    } else {
      this.widgetsContent.nativeElement.scrollLeft += 999;
    }
  }
  scrollLeft() {
    if (this.layoutService.isMobile) {
      this.widgetsContent.nativeElement.scrollLeft -= 200;
    } else {
      this.widgetsContent.nativeElement.scrollLeft -= 999;
    }
  }

  handleInterSection(e: IntersectionObserverEntry[]) {

    let entry = e[0];
    if ((<HTMLElement>e[0].target).dataset.side === 'left') {
      if (entry.isIntersecting) this.leftActive = false;
      else this.leftActive = true;
    }
    else {
      if (entry.isIntersecting) this.rightActive = false;
      else this.rightActive = true;
    }
  }

  ngOnInit(): void {
    this.homeService.getCuisineData().subscribe((response) => {
      this.cuisines = response.cuisines;
    }
    )
  }

  onDestroy() {
    if (this.leftLimit && this.rightLimit) {
      this.interObs.unobserve(this.leftLimit.nativeElement);
      this.interObs.unobserve(this.rightLimit.nativeElement);

    }
  }

}
