import { Component, Input, OnInit } from '@angular/core';
import { StoreItem } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'store-item-card',
  templateUrl: './store-item-card.component.html',
  styleUrls: ['./store-item-card.component.scss']
})
export class StoreItemCardComponent implements OnInit {
  @Input() storeItem: StoreItem
  constructor() { }

  ngOnInit(): void {
  }
  click() {
    alert('click success');
  }
}
