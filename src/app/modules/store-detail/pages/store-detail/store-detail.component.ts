import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize, map, mergeMap } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { StoreDetail, StoreItem } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { combineLatest, CombineLatestSubscriber } from 'rxjs/internal/observable/combineLatest';
import { forkJoin, zip } from 'rxjs';
import { UserLocation } from 'src/app/core/model/user-location';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit, AfterViewInit, OnDestroy {
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
  constructor(private storeDetailServ: StoreDetailDataService,
    private route: ActivatedRoute, private geoLoc: GeoLocationService) { }

  ngAfterViewInit(): void {
  }

  observeIntersection() {
    let obs = new IntersectionObserver((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) this.scrolledDown = false;
      else this.scrolledDown = true;
    });
    obs.observe(this.obsElement.nativeElement);
  }

  ngOnInit(): void {

    // this.routeParamsSubs = this.route.params.pipe(
    // ).subscribe((param) => {
    //   let id = parseInt(param.id);
    //   if (id) {
    //     this.storeId = id;
    //     this.loadStore();
    //   }
    // });
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

    // this.geoLoc.userLocation().subscribe((loc) => { console.log(loc) })
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