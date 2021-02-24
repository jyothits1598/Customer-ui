import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingHelperService {

  constructor(private router: Router) {
    this.router.routerState.snapshot.root.queryParams;

  }

  addQuery(q: string, value: string) {
    let curr = { ...this.router.routerState.snapshot.root.queryParams };
    if (value) curr[q] = value;
    else delete curr[q];
    let url = this.router.url.split('?')[0];
    this.router.navigate([url], { queryParams: curr });
  }
}
