import { AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { StorePagination } from 'src/app/shared/classes/pagination';
import { InfiniteScrollDirective } from 'src/app/shared/directives/infinite-scroll.directive';
import { Store } from '../../model/store';
import { StoreFilter } from '../../model/StoreFilter';
import { StoresDataService } from '../../services/stores-data.service';

@Component({
  selector: 'store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() parentKey: string = undefined;

  stores$ = new BehaviorSubject<Store[]>([]);

  pagination: StorePagination;
  unSubscribe$ = new Subject<void>();
  @Output() totalCount = new EventEmitter<number>();
  isActive: string = '';
  @Input() filter: StoreFilter;

  @ViewChild('infiniteScroll', { read: InfiniteScrollDirective })
  infiniteScroll: InfiniteScrollDirective;

  constructor(
    private storeData: StoresDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isActive = 'nearBy';
    console.log('StoreListComponent.constructor()... ', this.parentKey);
  }

  ngOnInit(): void {
    const cachedStoreListItem = this.storeData.retrieveStoreList(
      this.parentKey
    );
    if (cachedStoreListItem) {
      console.log(
        'StoreListComponent.ngOnInit(): Restoring pagination: ',
        this.parentKey
      );
      this.pagination = cachedStoreListItem.pagination;
      this.appendStores(cachedStoreListItem.stores);
    } else {
      console.log(
        'StoreListComponent.ngOnInit(): Creationg new pagination: ',
        this.parentKey
      );
      this.pagination = new StorePagination(
        this.storeData.allStores.bind(this.storeData),
        this.filter
      );
      this.pagination
        .getNext()
        .pipe(take(1))
        .subscribe((stores) => this.appendStores(stores));
    }
  }

  ngAfterViewChecked(): void {}

  ngOnDestroy(): void {
    console.log('Caching storelist for: ', this.parentKey);
    this.storeData.cacheStoreList(this.parentKey, {
      stores: this.stores$.value,
      pagination: this.pagination,
      filter: undefined,
      currentPage: undefined,
    });
  }

  appendStores(stores) {
    //this.totalCount.emit(this.pagination.totalCount);
    console.log(
      'current stores: ',
      this.stores$.value,
      ', appending stores: ',
      stores
    );
    this.stores$.next([...this.stores$.value, ...stores]);
  }

  storeSelected(id: number) {
    this.router.navigate([`restaurants/${id}`]);
  }

  handleScrolled() {
    this.pagination
      .getNext()
      .pipe(take(1))
      .subscribe((stores) => this.appendStores(stores));
  }

  navigateToPath(type) {
    this.isActive = type;
    this.filter['sort_by'] = type;
    this.stores$.next([]);
    this.pagination = new StorePagination(
      this.storeData.allStores.bind(this.storeData),
      this.filter
    );
    this.pagination
      .getNext()
      .pipe(take(1))
      .subscribe((stores) => this.appendStores(stores));
  }
}
