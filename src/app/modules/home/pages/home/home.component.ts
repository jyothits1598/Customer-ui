import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { pairwise, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { SearchDataService } from 'src/app/modules/search/services/search-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _isHidden = false;
  isLoggedin: boolean;
  stateSubs: Subscription;
  isMobile: boolean;
  isActive:string = '';
  constructor(
    private authService: AuthService,
    protected searchService: SearchDataService,
    private layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isMobile = this.layoutService.isMobile;
    if(this.route.snapshot.queryParams['type']){
      this.isActive = this.route.snapshot.queryParams['type'];
    }
  }

  unSub$ = new Subject<true>();


  ngOnInit(): void {
    // this.isLoggedin$ = this.authService.isLoggedIn$();
    this.authService
      .isLoggedIn$().pipe(takeUntil(this.unSub$))
      .subscribe((state) => (this.isLoggedin = state));

      
    // this.router.events.pipe(pairwise()).subscribe(([prevRouteEvent, currRouteEvent]) => {
    //   if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
    //     this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
    //   }
    //   if (currRouteEvent instanceof NavigationEnd) {
    //     window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url] || 0);
    //   }
    // })

    // this.router.events.pipe().subscribe((event) => {
    //   // if(event instanceof NavigationEnd || event instanceof NavigationStart){
    //   console.log(this.router.routerState);
    //   // console.log(event1, event2)?
    // })
    // this.route.data.subscribe((data)=>{console.log('printing data', data)})
  }

  // ngOnInit() {

  //   // save or restore scroll position on route change
  // }

  get isHidden(): boolean {
    return this.searchService.overlayOpen;
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
  }

  
  navigateToPath(type){
    this.router.navigate(['./sortBy'], { queryParams: { type: type } });
  }
}
