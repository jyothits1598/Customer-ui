import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../../model/store';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss']
})
export class StoreCardComponent implements OnInit {
  @Input() store: Store;

  constructor(private window: Window) {
  }

  getShareUrl(): string {
    return this.window.location.origin + '/restaurants/' + this.store.id;
  }

  ngOnInit(): void {

  }

}
