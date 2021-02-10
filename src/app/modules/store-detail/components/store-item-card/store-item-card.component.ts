import { Component, Input, OnInit } from '@angular/core';
import { StoreItem } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['./store-item-card.component.scss']
})
export class StoreItemCardComponent implements OnInit {
  @Input() storeItem: StoreItem
  
  static_image_path = "https://cdn.statically.io/img/"
  static_image_width = '?w=250,q=50,f=webp';
  constructor() { }
  
  ngOnInit(): void {
  }

  showDecimal(number){
    return Math.round((parseFloat(number) + Number.EPSILON) * 100) / 100
  }
  
}
