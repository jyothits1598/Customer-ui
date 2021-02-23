import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StoreMenus } from 'src/app/modules/store-detail/model/store-detail';

@Component({
  selector: 'app-store-details-bar',
  templateUrl: './store-details-bar.component.html',
  styleUrls: ['./store-details-bar.component.scss']
})
export class StoreDetailsBarComponent implements OnInit {
  @Input() menus: Array<StoreMenus>;
  @Output() menuClicked = new EventEmitter<any>();
  currentMenu: StoreMenus;
  storeStatus: string;
  storeMenus :any;
  constructor() { }

  ngOnInit(): void {
    this.storeMenus = this.menus;
    this.currentMenu = this.menus['menus'][0].name;
    this.storeStatus = this.menus['status'];
  }

  getMenuClickedId(menu){
    this.currentMenu = menu.name;
    this.menuClicked.emit(menu.id);
  }

}
