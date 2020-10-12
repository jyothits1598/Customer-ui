import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Component({
  selector: 'store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.scss']
})
export class StoreSearchComponent implements OnInit {

  constructor(private restApiService: RestApiService) { }
  searchActivated: boolean = false;
  ngOnInit(): void {
  }

  handleClick() {

  }

  apiFunction = (term: string) => {
    return this.restApiService.get(`api/stores/search?name=${term}`).pipe(map(
      (resp: any) => resp.data.stores
    ))
  };

  accessor: (any) => string = (store) => store.store_name;
}
