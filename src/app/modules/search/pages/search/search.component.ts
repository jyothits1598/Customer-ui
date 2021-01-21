import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap, filter, map, mergeMap, tap } from 'rxjs/operators'
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { NavbarService } from 'src/app/modules/navbar/services/navbar.service';
import { StoreFilter } from 'src/app/modules/stores/model/StoreFilter';
import { SearchDataService } from '../../services/search-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  storeFilter: StoreFilter;
  subs: Subscription;
  resultCount: number = null;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: GeoLocationService,
    private searchDataServ: SearchDataService) { }

  ngOnInit(): void {
    this.subs = this.route.queryParams.pipe(
      tap(()=>console.log('search query param')),
      filter(param => param.q),
      mergeMap((query: any) => this.location.userLocation().pipe(
        map(loc => ({ name: query.q, location: loc.latLng }))
      ))
    ).subscribe(val => {this.storeFilter = val;  });
  }

  ngOnDestroy(): void {
    this.searchDataServ.clearSearch();
    this.subs.unsubscribe();
  }

}
