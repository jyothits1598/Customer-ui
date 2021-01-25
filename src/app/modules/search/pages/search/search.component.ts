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
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { NavbarService } from 'src/app/modules/navbar/services/navbar.service';
import { StoreFilter } from 'src/app/modules/stores/model/StoreFilter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  storeFilter: StoreFilter;
  resultCount$ = new BehaviorSubject<number>(0);
  isMobile: boolean;

  @ViewChild('seachTempl', { read: TemplateRef }) searchTemp: TemplateRef<any>;

  unSub$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: GeoLocationService,
    private layoutService: LayoutService,
    private navbarServic: NavbarService
  ) {
    this.isMobile = this.layoutService.isMobile;
  }

  ngAfterViewInit(): void {
    this.navbarServic.setTemplate(this.searchTemp);
  }

  checkForRoute(url: string) {
    // console.log('ckecking route', url)
    return url.includes('/search');
  }

  ngOnInit(): void {
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

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.unSub$)
      )
      .subscribe((end: NavigationEnd) => {
        if (this.checkForRoute(end.url))
          this.navbarServic.setTemplate(this.searchTemp);
        else this.navbarServic.setTemplate(null);
      });
  }

  updateResultCount(count: number) {
    this.resultCount$.next(count);
  }

  ngOnDestroy(): void {
    this.unSub$.next();
    this.unSub$.complete();
  }
}
