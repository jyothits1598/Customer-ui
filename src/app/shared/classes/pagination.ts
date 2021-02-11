import { Observable, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { ConfirmedOrderData, mapToOrderData, OrderDto } from 'src/app/core/model/cart';
import { ReadStore, Store } from 'src/app/modules/stores/model/store';
import { StoreFilter } from 'src/app/modules/stores/model/StoreFilter';

// TODO: reimplement Pagination

export class Pagination<T>{
    currentPage: number;
    data: Array<T> = [];
    source: (...args: any[]) => Observable<any>;
    getNext(): Observable<Array<T>> { return of([]) };
    onEnd: () => void;
    hasEnded = false;
    isLoading: boolean = false;
    currentPage: number = 1;
    //to fix repeated loading in the home screen upon errors
    hasErrors: boolean = false;
    totalCount: number;

    setPaginationData(resp) {
        console.log('set page', resp, resp.data.next_page_url);
        this.currentPage += 1;
        this.totalCount = resp.data.total;
        if (!resp.data.next_page_url) this.hasEnded = true;
    }
    constructor(source) {
        this.source = source;
    }
}

export class StorePagination extends Pagination<Store>{
    storeFilter: StoreFilter;

    constructor(source: (any) => Observable<any>, filter) {
        super(source);
        this.storeFilter = filter;
    }

    getNext(): Observable<Array<Store>> {
        this.storeFilter.page = this.currentPage;
        if (!this.hasEnded && !this.isLoading && !this.hasErrors) {
            this.isLoading = true;
            return this.source(this.storeFilter).pipe(
                finalize(() => this.isLoading = false),
                tap(resp => { this.setPaginationData(resp) }),
                catchError((error) => { this.hasErrors = true; return error }),
                map((resp: any) => {
                    let newStores = [];
                    if (resp.data.stores) resp.data.stores.forEach(store => { newStores.push(ReadStore(store)) });
                    return newStores;
                })
            );
        } else return of([])
    }
}

export class OrderPagination extends Pagination<ConfirmedOrderData>{

    constructor(source: (any) => Observable<any>) {
        super(source);
    }

    getNext(): Observable<Array<ConfirmedOrderData>> {
        if (!this.hasEnded && !this.isLoading && !this.hasErrors) {
            this.isLoading = true;
            return this.source(this.currentPage).pipe(
                finalize(() => this.isLoading = false),
                tap(resp => { this.setPaginationData(resp) }),
                catchError((error) => { this.hasErrors = true; return error }),
                map((resp: any) => {
                    let ordersList = [];
                    if (resp.data.orders) resp.data.orders.forEach(ord => { ordersList.push(mapToOrderData(ord)) });
                    return ordersList || [];
                })
            );
        } else return of([])
    }
}
