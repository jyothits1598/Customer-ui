import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Pagination, StorePagination } from 'src/app/shared/classes/pagination';
import { InfiniteScrollDirective } from 'src/app/shared/directives/infinite-scroll.directive';
import { Store } from '../../model/store';
import { StoreFilter } from '../../model/StoreFilter';
import { StoresDataService } from '../../services/stores-data.service';

@Component({
  selector: 'store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {
  stores: Array<Store> = [];
  pagination: StorePagination;
  _filter: StoreFilter
  @Input() set filter(f: StoreFilter){
    console.log('got a store filter', f)
  };
  @ViewChild('infiniteScroll', {read: InfiniteScrollDirective}) infiniteScroll: InfiniteScrollDirective;
  
  constructor(private storeData: StoresDataService,
  ) {
  }
  ngOnInit(): void {
    console.log('contructor of store list')
    this.pagination = new StorePagination(this.storeData.allStores.bind(this.storeData), this.stores);
    this.pagination.getNext();
  }

}
