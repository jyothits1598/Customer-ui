import { Component, OnInit } from '@angular/core';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { Store } from 'src/app/modules/stores/model/store';
import { StoresDataService } from 'src/app/modules/stores/services/stores-data.service';

@Component({
  selector: 'app-favourite-stores',
  templateUrl: './favourite-stores.component.html',
  styleUrls: ['./favourite-stores.component.scss']
})
export class FavouriteStoresComponent implements OnInit {

  stores: Array<Store>;
  loading: boolean = false;
  error: boolean = false;

  constructor(private storeData: StoresDataService,
    private locationService: GeoLocationService) { }

  ngOnInit(): void {
    this.locationService.userLocation().pipe(
      tap(() => this.loading = true),
      switchMap(location => this.storeData.allFavourites({ location: location.latLng })),
    ).subscribe(
      stores => {
        this.stores = stores;
        this.loading = false;
      }

    )

    // this.storeData.allFavourites().pipe(finalize(() => this.loading = false)).subscribe(
    //   strs => {
    //     console.log('fav stores, ', strs); this.stores = strs
    //   },
    //   () => this.error = true
    // );
  }

}
