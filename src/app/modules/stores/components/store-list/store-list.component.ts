import { Component, OnInit, ViewChild } from '@angular/core';
import { Pagination, StorePagination } from 'src/app/shared/classes/pagination';
import { InfiniteScrollDirective } from 'src/app/shared/directives/infinite-scroll.directive';
import { Store } from '../../model/store';
import { StoresDataService } from '../../services/stores-data.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  stores: Array<Store> = [];
  pagination: StorePagination;
  
  @ViewChild('infiniteScroll', {read: InfiniteScrollDirective}) infiniteScroll: InfiniteScrollDirective;
  
  constructor(private storeData: StoresDataService,
  ) {
    this.pagination = new StorePagination(this.storeData.allStores.bind(storeData), this.stores);
  }
  ngOnInit(): void {
    this.pagination.getNext();
  }

}
