import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { StoreDetail } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { UserLocation } from 'src/app/core/model/user-location';

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

  storeDetail: StoreDetail;
  loading: boolean = true;
  error: boolean = false;

  routeParamsSubs;
  routeQueryparamsSubs;

  @ViewChild('observationElement', { read: ElementRef }) obsElement: ElementRef;
  @ViewChild('fbParent', { read: ElementRef }) fbParent: ElementRef;
  constructor(private storeDetailServ: StoreDetailDataService,
    private route: ActivatedRoute,
    private geoLoc: GeoLocationService,
    private router: Router) { }

  observeIntersection() {
    let obs = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) this.scrolledDown = false;
      else this.scrolledDown = true;
    });
    obs.observe(this.obsElement.nativeElement);
  }

  ngOnInit(): void {
    this.routeParamsSubs = this.route.params.pipe(
      mergeMap((param) => this.geoLoc.userLocation().pipe(map(loc => { return { param: param.id, location: loc } })))
    ).subscribe((data) => {
      console.log(data);
      let id = parseInt(data.param);
      if (id) {
        this.storeId = id;
        this.loadStore(data.location);
      }
    });

    this.routeQueryparamsSubs = this.route.queryParams.subscribe((qParams) => {
      this.selecteditemId = +qParams.i;
    })

    // open cart by default
    if (!this.router.url.includes('(order:')) this.router.navigate([{ outlets: { 'order': ['cart'] } }], { replaceUrl: true })

  }

  loadStore(location?: UserLocation) {
    this.loading = true;
    this.storeDetail = null;
    this.storeDetailServ.storeDetail(this.storeId, location).pipe(finalize(() => this.loading = false)).subscribe(storeDetail => {
      storeDetail.categories = storeDetail.categories.sort((c1, c2) => c1.id - c2.id);
      this.storeDetail = storeDetail;
      setTimeout(() => {
        this.observeIntersection();
      }, 0);
    });
  }

  ngOnDestroy(): void {
    this.routeQueryparamsSubs.unsubscribe();
    this.routeParamsSubs.unsubscribe();
  }

}