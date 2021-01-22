import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouteReuseStrategy } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _routeScrollPositions: { [url: string]: number }[] = [];
  reusedRoute: string[] = ['/', '/search']
  constructor(private router: Router) { }

  ngOnInit() {
    // save or restore scroll position on route change
    this.router.events.pipe(filter((event) => { return event instanceof NavigationEnd || event instanceof NavigationStart }), pairwise()).subscribe(([prevRouteEvent, currRouteEvent]) => {
      if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
        if (this.isRouteIsReused(prevRouteEvent.url)) this._routeScrollPositions[prevRouteEvent.url] = window.pageYOffset;
      }
      if (currRouteEvent instanceof NavigationEnd) {
        if (this.isRouteIsReused(currRouteEvent.url)) window.scrollTo(0, this._routeScrollPositions[currRouteEvent.url] || 0);
      }
    })
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd || event instanceof NavigationStart) {
    //     console.log(event);
    //     console.log('printing data from router', this.router.routerState.snapshot);
    //     // console.log('printing data', this.route.snapshot.data);
    //   }
    // })
  }

  isRouteIsReused(route: string): boolean {
    if (route === '/') return true;
    if (route.includes('/search')) return true;
    return false;
  }

  
}
