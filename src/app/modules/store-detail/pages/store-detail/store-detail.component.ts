import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter, finalize, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { StoreCategory, StoreDetail, StoreItem } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { UserLocation } from 'src/app/core/model/user-location';
import { Subject, Subscription } from 'rxjs';
import { OrderPages, OrderViewControllerService } from 'src/app/core/services/order-view-controller.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { CartService } from 'src/app/core/services/cart.service';
import { PARTNER_APP_LINK } from 'src/environments/environment';
import { PresentAvailabilityComponent } from 'src/app/modules/time-availability/present-availability/present-availability.component';
import { StoreItemDetail } from 'src/app/modules/store-item-detail/model/store-item-detail';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit, OnDestroy {
  storeId: number;
  selectedItem: StoreItemDetail & { storeName: string, storeId: number, isFavourite: boolean };
  scrolledDown: boolean;
  userLocation: boolean;
  interObserver: IntersectionObserver;
  partnerAppLink = PARTNER_APP_LINK;
  static_image_width = '?w=1024,q=50,f=webp';
  static_image_width_logo = '?w=120,q=50,f=webp';

  storeDetail: StoreDetail;
  loading: boolean = true;
  error: boolean = false;

  isStoreOpen: boolean;
  unSub$ = new Subject<true>();
  strDtlSub: Subscription
  @ViewChild('observationElement', { read: ElementRef }) obsElement: ElementRef;
  @ViewChild('fbParent', { read: ElementRef }) fbParent: ElementRef;

  constructor(private storeDetailServ: StoreDetailDataService,
    private route: ActivatedRoute,
    private location: Location,
    private orderView: OrderViewControllerService,
    private cartSrv: CartService,
    private layoutService: LayoutService,
    private geoLoc: GeoLocationService) { }

  observeIntersection() {
    this.interObserver = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) this.scrolledDown = false;
      else this.scrolledDown = true;
    });
    this.interObserver.observe(this.obsElement.nativeElement);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((qParams) => {
      let itemId = +qParams.i;
      // this.selectedItem = this.storeDetail.categories[]
      // this.storeDetail.categories.find((c: StoreCategory) => {
      //   let a = c.items.find(i => i.id === this.selecteditemId)
      //   return !!a;
      // })
      if (itemId) {
        for (const a of this.storeDetail.categories) {
          let i = a.items.find(i => i.id === itemId)
          if (i) {
            this.selectedItem = { ...i, storeName: this.storeDetail.name, storeId: this.storeId, isFavourite: this.storeDetail.isFavourite };
            break;
          }
        }
      } else this.selectedItem = null;

    })

    if (!this.layoutService.isMobile && !this.orderView.getCurrentPage()) this.orderView.showPage(OrderPages.Cart);

    this.route.params.pipe(map((p) => +p.id)).subscribe((id) => {
      this.reset();
      this.storeId = id;
      this.loadStore(id, this.geoLoc.getUserLocation());
    })
  }

  loadStore(storeId: number, location?: UserLocation) {
    this.loading = true;
    this.storeDetail = null;
    this.strDtlSub = this.storeDetailServ.storeDetail(storeId, location).pipe(takeUntil(this.unSub$), finalize(() => this.loading = false)).subscribe(storeDetail => {
      storeDetail.categories = storeDetail.categories.sort((c1, c2) => c1.id - c2.id);
      this.storeDetail = storeDetail;
      let av = new PresentAvailabilityComponent();
      av.availability = storeDetail.openingHours;
      this.isStoreOpen = !!av.openTimings;
      setTimeout(() => {
        this.observeIntersection();
      }, 0);
    });

  }

  reset() {
    if (this.strDtlSub) this.strDtlSub.unsubscribe();
    if (this.interObserver) this.interObserver.disconnect();
  }

  ngOnDestroy(): void {
    this.reset();
    if (!this.cartSrv.presentCartData && this.orderView.getCurrentPage() === OrderPages.Cart) this.orderView.showPage(null);

  }

  goBack() {
    this.location.back();
  }

  getMenuClickedDetails(menuId) {
    this.loading = true;
    this.storeDetail.categories = null;
    this.strDtlSub = this.storeDetailServ.getCateoryDetail(this.storeId, menuId).pipe(takeUntil(this.unSub$), finalize(() => this.loading = false)).subscribe(categoryDetail => {
      categoryDetail = categoryDetail.sort((c1, c2) => c1.id - c2.id);
      console.log('this is category details', categoryDetail);
      this.storeDetail.categories = categoryDetail;
      // setTimeout(() => {
      //   this.observeIntersection();
      // }, 0);
    });
  }

}