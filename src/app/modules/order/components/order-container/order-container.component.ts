import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { LayoutService } from 'src/app/core/services/layout.service';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';

@Component({
  selector: 'order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.scss']
})
export class OrderContainerComponent implements OnInit, OnDestroy {

  orderPages = OrderPages;
  currentPage$;
  showClose: boolean;
  unSub$ = new Subject<true>();

  constructor(private router: Router,
    private orderView: OrderViewControllerService,
    private layout: LayoutService) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      switchMap((e: NavigationEnd) => of(!e.url.includes('/restaurants/') || this.layout.isMobile)),
      takeUntil(this.unSub$)
    ).subscribe((show) => this.showClose = show);
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
  }

  close() {
    this.orderView.showPage(null);
  }

  ngOnInit(): void {
    this.currentPage$ = this.orderView.getCurrentPage$();
  }

}
