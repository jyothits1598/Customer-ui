import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
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
    private navbarServic: NavbarService,
    private searchService: SearchDataService,
    private router: Router
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  checkForRoute(url: string) {
    // console.log('ckecking route', url)
    return url.includes('/search');
  }

  ngOnInit(): void {
    console.log('search: ngOnInit() reached');
    this.route.queryParams
      .pipe(
        filter((param) => param.q),
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
    // this.router.events.pipe(filter((event) => { return event instanceof NavigationEnd || event instanceof NavigationStart }), pairwise()).subscribe(([prevRouteEvent, currRouteEvent]) => {
    //   if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
    //     console.log('prev', prevRouteEvent.url, 'current', currRouteEvent.url)
    //     // if (this.isRouteIsReused(prevRouteEvent.url)) this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
    //     if (this.checkForRoute(prevRouteEvent.url)) {
    //       //navigating away
    //       console.log('navigating away');
    //     } else if (this.checkForRoute(currRouteEvent.url)) {
    //       //navigating into
    //       console.log('navigating into');
    //     }
    //   }
    //   if (currRouteEvent instanceof NavigationEnd) {
    //     if (this.checkForRoute(currRouteEvent.url)) console.log('navigating end 2');
    //   }
    // })
    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     takeUntil(this.unSub$)
    //   )
    //   .subscribe((end: NavigationEnd) => {
    //     if (this.checkForRoute(end.url))
    //       this.navbarServic.setTemplate(this.searchTemp);
    //     else this.navbarServic.setTemplate(null);
    //   });
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
