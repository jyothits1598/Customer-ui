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

  ngOnInit(): void {}

  select(id: number) {
    this.selected.next(id);
  }
}
