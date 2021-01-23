import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.scss']
})
export class FilterCategoriesComponent implements OnInit {
//filter = new Array();
  pageNumber : number = 1;
  right:boolean = true;
  constructor() { }
  @ViewChild('widgetsContent') widgetsContent: ElementRef;

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 999;
    this.pageNumber++;
    // if (this.widgetsContent.nativeElement.offsetWidth + this.widgetsContent.nativeElement.scrollLeft >= this.widgetsContent.nativeElement.scrollWidth) {
      console.log("End");
    //  this.getAllOrders('pagination');

    // }

  }
  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 999;
  }

  ngOnInit(): void {
  }
// filter = [{prest-image:'',next-image:'',name:''}];
}
