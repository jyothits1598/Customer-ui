import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap, filter, map, mergeMap } from 'rxjs/operators'
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { StoreFilter } from 'src/app/modules/stores/model/StoreFilter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  storeFilter: StoreFilter;
  subs: Subscription;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: GeoLocationService) { }

  ngOnInit(): void {
    this.subs = this.route.queryParams.pipe(
      filter(param => param.q),
      mergeMap((query: any) => this.location.userLocation().pipe(
        map(loc => ({ name: query.q, location: loc.latLng }))
      ))
    ).subscribe(val => this.storeFilter = val)
  }

  handleTermSearch(term: string) {
    this.router.navigate(["."], { relativeTo: this.route, queryParams: { q: term } });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
