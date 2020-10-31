import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Store } from 'src/app/modules/stores/model/store';
import { StoresDataService } from 'src/app/modules/stores/services/stores-data.service';

@Component({
  selector: 'app-favourite-stores',
  templateUrl: './favourite-stores.component.html',
  styleUrls: ['./favourite-stores.component.scss']
})
export class FavouriteStoresComponent implements OnInit {

  stores: Array<Store>;
  loading: boolean = true;
  error: boolean = false;

  constructor(private storeData: StoresDataService) { }

  ngOnInit(): void {
    this.storeData.allFavourites().pipe(finalize(() => this.loading = false)).subscribe(
      strs => {console.log('fav stores, ', strs);this.stores = strs},
      () => this.error = true
    );
  }

}
