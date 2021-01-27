import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LayoutService } from 'src/app/core/services/layout.service';
import { HomeService } from '../../home.service';
import { Cuisines } from '../../modal/cuisines';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.scss']
})
export class FilterCategoriesComponent implements OnInit, OnDestroy {
  right: boolean = true;
  cuisines = new Array<Cuisines>();
  unSub$ = new Subject<true>();

  constructor(
    private layoutService: LayoutService,
    private homeService: HomeService
  ) { }
  ngOnDestroy(): void {
    this.unSub$.next(true);
  }
  @ViewChild('widgetsContent') widgetsContent: ElementRef;

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

  ngOnInit(): void {
    this.homeService.getCuisineData().subscribe((response) => 
    this.cuisines = response['data']['cuisines']
    
  )
}

}
