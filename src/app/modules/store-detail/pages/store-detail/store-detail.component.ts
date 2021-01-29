import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { StoreDetail, StoreItem } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { UserLocation } from 'src/app/core/model/user-location';
import { Subject } from 'rxjs';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit, OnDestroy {
  storeId: number;
  selecteditemId: number;
  scrolledDown: boolean;
  userLocation: boolean;
  interObserver: IntersectionObserver;

  storeDetail: StoreDetail;
  loading: boolean = true;
  error: boolean = false;

  unSub$ = new Subject<true>();

  @ViewChild('observationElement', { read: ElementRef }) obsElement: ElementRef;
  @ViewChild('fbParent', { read: ElementRef }) fbParent: ElementRef;

  constructor(private storeDetailServ: StoreDetailDataService,
    private route: ActivatedRoute,
    private geoLoc: GeoLocationService,
    private location: Location,
    private orderView: OrderViewControllerService,
    private cartSrv: CartService,
    private layoutService: LayoutService) { }

  observeIntersection() {
    this.interObserver = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) this.scrolledDown = false;
      else this.scrolledDown = true;
    });
    this.interObserver.observe(this.obsElement.nativeElement);
  }

  ngOnInit(): void {
    // this.route.params.pipe(
    //   mergeMap((param) => this.geoLoc.userLocation().pipe(map(loc => { return { param: param.id, location: loc } })))
    // ).subscribe((data) => {
    //   let id = parseInt(data.param);

    //   if (id && id !== this.storeId) {
    //     this.storeId = id;
    //     this.loadStore(data.location);
    //   }
    // });
    let id = parseInt(this.route.snapshot.params.id);
    if (id) {
      this.loadStore(id, this.geoLoc.getUserLocation());
      this.storeId = id;
    }

    this.route.queryParams.pipe(takeUntil(this.unSub$)).subscribe((qParams) => {
      this.selecteditemId = +qParams.i;
    })

    // open cart by default
    // if (!this.router.url.includes('(order:')) this.router.navigate([{ outlets: { 'order': ['cart'] } }], { replaceUrl: true })
    if (!this.layoutService.isMobile && !this.orderView.getCurrentPage()) this.orderView.showPage(OrderPages.Cart);
  }

  loadStore(storeId: number, location?: UserLocation) {
    this.loading = true;
    this.storeDetail = null;
    this.storeDetailServ.storeDetail(storeId, location).pipe(takeUntil(this.unSub$), finalize(() => this.loading = false)).subscribe(storeDetail => {
      storeDetail.categories = storeDetail.categories.sort((c1, c2) => c1.id - c2.id);
      this.storeDetail = storeDetail;
      setTimeout(() => {
        this.observeIntersection();
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.interObserver.unobserve(this.obsElement.nativeElement);
    if (!this.cartSrv.presentCartData && this.orderView.getCurrentPage() === OrderPages.Cart) this.orderView.showPage(null);

  }

  goBack() {
    this.location.back();
  }

}