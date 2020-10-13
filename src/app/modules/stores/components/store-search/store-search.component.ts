import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { StoresDataService } from '../../services/stores-data.service';

@Component({
  selector: 'store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.scss']
})
export class StoreSearchComponent implements OnInit {

  constructor(private restApiService: RestApiService,
    private storeData: StoresDataService) { }
  searchActivated: boolean = false;
  ngOnInit(): void {
  }


  apiFunction = (term: string) => {
    // return this.restApiService.get(`api/stores/search?name=${term}`).pipe(map(
    //   (resp: any) => resp.data.stores
    // ))
    let filter = { name: term }
    return this.storeData.allStores(name).pipe(map((resp : any) => resp.data.stores));
  };

  accessor: (any) => string = (store) => store.store_name;

  modalSearch(){
    document.getElementById('search_list').style.display = 'block';
  }

  handleClick(){
    document.getElementById('search_list').style.display = 'none';
  }
}
