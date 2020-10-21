import { Observable, of } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { ReadStore, Store } from 'src/app/modules/stores/model/store';
import { StoreFilter } from 'src/app/modules/stores/model/StoreFilter';

export class Pagination<T>{
    currentPage: number;
    data: Array<T> = [];
    source: (...args: any[]) => Observable<any>;
    getNext(): Observable<Array<T>> { return of([]) };
    onEnd: () => void;
    hasEnded = false;
    isLoading: boolean = false;
    currentPage: number = 1;

    setPaginationData(resp) {
        this.currentPage += 1;
        if(!resp.data.next_page_url) this.hasEnded = true;
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
        if (!this.hasEnded && !this.isLoading) {
            this.isLoading = true;
            return this.source(this.storeFilter).pipe(
                finalize(() => this.isLoading = false),
                tap(resp => { this.setPaginationData(resp) }),
                map((resp: any) => {
                    let newStores = [];
                    if(resp.data.stores) resp.data.stores.forEach(store => newStores.push(ReadStore(store)));
                    return newStores;
                })
            );
        } else return of([])
    }
}