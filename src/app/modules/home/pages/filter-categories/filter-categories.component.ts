import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.scss']
})
export class FilterCategoriesComponent implements OnInit {
  right:boolean = true;
  constructor(
    private layoutService: LayoutService
  ) { }
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
  }
// filter = [{prest-image:'',next-image:'',name:''}];
}
