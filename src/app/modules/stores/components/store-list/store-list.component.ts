import { AfterViewChecked, AfterViewInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { RoutingHelperService } from 'src/app/core/services/routing-helper.service';
import { ScrollPositionService } from 'src/app/core/services/scroll-position.service';
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
export class StoreListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() parentKey: string = undefined;
  @Input() showItems: boolean;
  @Input() displaySingleCol: boolean;
  @Input() type: 'favItems' | 'favStores' | 'search';
  @Input() hideSorter: boolean;
  
  stores$ = new BehaviorSubject<Store[]>([]);

  pagination: StorePagination;
  unSubscribe$ = new Subject<void>();
  @Output() totalCount = new EventEmitter<number>();
  isActive: string;
  private _filter: StoreFilter;
  @Input() filter;

  @ViewChild('infiniteScroll', { read: InfiniteScrollDirective })
  infiniteScroll: InfiniteScrollDirective;

  private paginationSub: Subscription = undefined;

  constructor(
    private storeData: StoresDataService,
    private route: ActivatedRoute,
    public rH: RoutingHelperService,
    private router: Router,
    private scrollPosService: ScrollPositionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter || changes.type) {
      let f = { ...this.filter }
      f.sort_type = f.sort_type || 'distance';
      this._filter = f;
      this.initPagination();

    }
  }

  ngOnInit(): void {
    const cachedStoreListItem = this.storeData.retrieveStoreList(
      this.parentKey
    );
    if (cachedStoreListItem) {
      this.restorePagination(cachedStoreListItem);
    }

    //setting isactive
    this.route.queryParams.pipe(takeUntil(this.unSubscribe$)).subscribe(q => this.isActive = q.sort_type || 'distance')
  }

  restorePagination(cachedStoreListItem) {
    // console.log(
    //   'StoreListComponent.ngOnInit(): Restoring pagination: ',
    //   this.parentKey
    // );
    this.paginationSub.unsubscribe();
    this.stores$.next([]);
    this.pagination = cachedStoreListItem.pagination;
    this.appendStores(cachedStoreListItem.stores);
  }

  initPagination() {
    // console.log(
    //   'StoreListComponent.initPagination(): Creating new pagination: ',
    //   this.parentKey,
    //   this._filter
    // );
    this.stores$.next([]);
    this.pagination = new StorePagination(
      this.storeData.allStores.bind(this.storeData),
      this._filter,
      this.type || 'search'
    );
    this.paginationSub = this.pagination
      .getNext()
      .pipe(take(1))
      .subscribe((stores) => this.appendStores(stores));
    this.scrollPosService.scrollToTop();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollPosService.repositionFor(this.parentKey);
    }, 0);
  }

  ngOnDestroy(): void {
    console.log('Caching storelist for: ', this.parentKey);
    this.scrollPosService.storePositionFor(this.parentKey);
    this.storeData.cacheStoreList(this.parentKey, {
      stores: this.stores$.value,
      pagination: this.pagination,
      filter: undefined,
      currentPage: undefined,
    });
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
    this.paginationSub.unsubscribe();
  }

  appendStores(stores) {
    this.totalCount.emit(this.pagination.totalCount);
    // console.log(
    //   'current stores: ',
    //   this.stores$.value,
    //   ', appending stores: ',
    //   stores
    // );
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

  // navigateToPath(type) {
  //   this.isActive = type;
  //   this._filter['sort_type'] = type;
  //   this.stores$.next([]);
  //   this.pagination = new StorePagination(
  //     this.storeData.allStores.bind(this.storeData),
  //     this._filter,

  //   );
  //   this.pagination
  //     .getNext()
  //     .pipe(take(1))
  //     .subscribe((stores) => this.appendStores(stores));
  // }
}
