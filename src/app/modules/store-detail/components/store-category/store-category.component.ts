import { Component, Input, OnInit } from '@angular/core';
import { StoreCategory } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'store-category',
  templateUrl: './store-category.component.html',
  styleUrls: ['./store-category.component.scss']
})
export class StoreCategoryComponent implements OnInit {
  @Input() storeCategory: StoreCategory;
  constructor() { }
  
  ngOnInit(): void {
  }

}
