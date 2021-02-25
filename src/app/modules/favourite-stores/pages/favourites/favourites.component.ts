import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { Store } from 'src/app/modules/stores/model/store';
import { StoreFilter } from 'src/app/modules/stores/model/StoreFilter';
import { StoresDataService } from 'src/app/modules/stores/services/stores-data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  isActive: string = '';
  stores: Array<Store>;
  loading: boolean = false;
  error: boolean = false;
  filter: StoreFilter;
  type: string;
  unSub$ = new Subject<true>();

  constructor(private storeData: StoresDataService,
    private locationService: GeoLocationService,
    private router: Router,
    private aR: ActivatedRoute) { }

  ngOnInit(): void {
    this.aR.params.pipe(takeUntil(this.unSub$)).subscribe((p) => {this.type = p.type === 'stores' ? 'favStores' : 'favItems'; console.log('this is the patam', p)});
    this.locationService.userLocation().pipe(
      takeUntil(this.unSub$)
    ).subscribe(
      loc => {
        this.filter = { location: loc.latLng }
      }
    )

    // this.storeData.allFavourites().pipe(finalize(() => this.loading = false)).subscribe(
    //   strs => {
    //     console.log('fav stores, ', strs); this.stores = strs
    //   },
    //   () => this.error = true
    // );
  }

  storeSelected(id: number) {
    this.router.navigate([`restaurants/${id}`]);
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
  }

}
