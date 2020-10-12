import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ReadStore, Store } from 'src/app/modules/stores/model/store';
import { inherits } from 'util';

// export class Pagination<T>{
//     currentPage: number;
//     paginationSource: (query: string) => Observable<any>;
//     collection: Array<T>;
//     nextPageQuery: string;
//     constructor(source: (string) => Observable<any>, collection: Array<T>) {
//         this.paginationSource = source;
//         this.collection = collection;
//         this.paginationSource(null).subscribe(
//             (resp)=>{
//                 this.nextPageQuery = resp
//             }
//         );
//     }
// }DDDD

export class Pagination<T>{
    currentPage: number;
    collection: Array<T>;
    source: (query: string) => Observable<any>;
    nextPageQuery: string;
    getNext() { };
    onEnd: () => void;
    hasEnded = false;
    isLoading: boolean = false;

    setPaginationData(data) {
        this.nextPageQuery = data.next_page_url;
    }
    constructor(source: (string) => Observable<any>, collection: Array<T>) {
        this.source = source;
        this.collection = collection;
    }
}

export class StorePagination extends Pagination<Store>{
    constructor(source: (string) => Observable<any>, collection: Array<Store>) {
        super(source, collection);
    }

    getNext() {
        if (!this.hasEnded) {
            this.isLoading = true;
            this.source(this.nextPageQuery).pipe(finalize(() => this.isLoading = false)).subscribe(
                (response) => {
                    this.setPaginationData(response);
                    let newStores = [];
                    response.data.stores.forEach(store => newStores.push(ReadStore(store)))
                    this.collection.splice(this.collection.length, 0, ...newStores)
                    if (this.currentPage == null) { };
                }
            )
        }
    }
}