import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Constants } from 'src/app/core/model/constants';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { NavbarService } from 'src/app/modules/navbar/services/navbar.service';
import { StoreListComponent } from 'src/app/modules/stores/components/store-list/store-list.component';
import { StoreFilter } from 'src/app/modules/stores/model/StoreFilter';
import { SearchDataService } from '../../services/search-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  pageKey = Constants.Keys.Search;

  storeFilter: StoreFilter;

  resultCount: number = null;
  isMobile: boolean;

  @ViewChild('seachTempl', { read: TemplateRef }) searchTemp: TemplateRef<any>;
  unSub$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private location: GeoLocationService,
    private layoutService: LayoutService,
    private searchService: SearchDataService,
    private router: Router
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  checkForRoute(url: string) {
    return url.includes('/search');
  }

  ngOnInit(): void {
    console.log('search: ngOnInit() reached');
    this.route.queryParams
      .pipe(
        filter((param) => param.q),
        tap((qparams) => (this.pageKey = `${this.pageKey}:${qparams.q}`)),
        mergeMap((query: any) =>
          this.location
            .userLocation()
            .pipe(map((loc) => ({ name: query.q, location: loc.latLng })))
        ),
        takeUntil(this.unSub$)
      )
      .subscribe((val) => {
        this.storeFilter = val;
      });
  }

  routeBack() {
    this.searchService.clearFullSearch();
    this.router.navigate(['./../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.complete();
    console.log('destroying search ondestroy');
  }
}
