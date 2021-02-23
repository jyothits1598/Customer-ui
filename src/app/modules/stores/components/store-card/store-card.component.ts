import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '../../model/store';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {
  @Input() store: Store;

  @Output() selected = new EventEmitter<number>();

  constructor() {}

  static_image_path = "https://cdn.statically.io/img/"
  static_image_width = '?w=600,q=50,f=webp';
  static_image_width_logo ='?w=100,q=50,f=webp';


  ngOnInit(): void {}

  select(id: number) {
    this.selected.next(id);
  }

  
}
