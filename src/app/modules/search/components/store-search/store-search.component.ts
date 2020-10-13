import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { StoresDataService } from 'src/app/modules/stores/services/stores-data.service';

@Component({
  selector: 'store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.scss']
})
export class StoreSearchComponent implements AfterViewInit {

  constructor(private storeData: StoresDataService) { }

  @Output() searchTerm = new EventEmitter<string>();

  searchActivated: boolean = false;

  @ViewChild('itemSearch', { read: ElementRef }) searchInput: ElementRef;
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }

  apiFunction = (term: string) => {
    let filter = { name: term }
    return this.storeData.allStores(filter).pipe(map((resp: any) => resp.data.stores || []));
  };

  accessor: (any) => string = (store) => store.store_name;

  modalSearch() {
    document.getElementById('search_list').style.display = 'block';
  }

}
