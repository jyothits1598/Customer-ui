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
  _filter$ = new BehaviorSubject<StoreFilter>(undefined);
  unSubscribe$ = new Subject<void>();
  @Output() totalCount = new EventEmitter<number>();
  isActive: string = '';
  @Input() set filter(f: StoreFilter) {
    console.log('StoreListComponent. @input set filter:', f);
    this._filter$.next(f);
    this.pagination = new StorePagination(
      this.storeData.allStores.bind(this.storeData),
      f
    );
    this.pagination
      .getNext()
      .pipe(take(1))
      .subscribe((stores) => {
        this.stores$.next([]);
        this.appendStores(stores);
      });
  }

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
        'StoreListComponent.ngOnInit(): Restoring storelist for key: ',
        this.parentKey
      );
      this.pagination.currentPage = cachedStoreListItem.currentPage;
      this.appendStores(cachedStoreListItem.stores);
    } else {
      console.log(
        'StoreListComponent.ngOnInit(): No cache for key: ',
        this.parentKey,
        ' (should getNext() from fresh pagination)'
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
      currentPage: this.pagination.currentPage,
    });
  }

  appendStores(stores) {
    //this.totalCount.emit(this.pagination.totalCount);
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
    this._filter$.value['sort_by'] = type;
    this.stores$.next([]);
    this.pagination = new StorePagination(
      this.storeData.allStores.bind(this.storeData),
      this._filter$.value
    );
    this.pagination
      .getNext()
      .pipe(take(1))
      .subscribe((stores) => this.appendStores(stores));
  }
}
