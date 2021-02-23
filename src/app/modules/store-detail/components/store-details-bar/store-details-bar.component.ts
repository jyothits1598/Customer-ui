import { Component, Input, OnInit } from '@angular/core';
import { StoreMenus } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'app-store-details-bar',
  templateUrl: './store-details-bar.component.html',
  styleUrls: ['./store-details-bar.component.scss']
})
export class StoreDetailsBarComponent implements OnInit {
  @Input() menus: Array<StoreMenus>;
  currentMenu: StoreMenus;
  storeMenus :any;
  constructor() { }

  ngOnInit(): void {
    this.storeMenus = this.menus;
    this.currentMenu = this.menus['menus'][0].name;
  }

}
