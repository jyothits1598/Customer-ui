import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { StoreDetail, StoreItem } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit, OnDestroy {
  storeId: number;
  selecteditemId: number;
  scrolledDown: boolean;

  @HostListener('window:scroll') onScroll(e: Event): void {
    if (window.scrollY > 50 && !this.scrolledDown) this.scrolledDown = true;
    else if (window.scrollY < 50 && this.scrolledDown) this.scrolledDown = false;
  }

  storeDetail: StoreDetail;
  loading: boolean = true;
  error: boolean = false;

  routeParamsSubs;
  routeQueryparamsSubs;

  constructor(private storeDetailServ: StoreDetailDataService,
    private route: ActivatedRoute, private window: Window) { }

  ngOnInit(): void {

    this.routeParamsSubs = this.route.params.subscribe((param) => {
      let id = parseInt(param.id);
      if (id) {
        this.storeId = id;
        this.loadStore();
      }
    });

    this.routeQueryparamsSubs = this.route.queryParams.subscribe((qParams) => {
      this.selecteditemId = +qParams.i;
    })

    // $(window).scroll(function () {
    //   if ($(this).scrollTop() > 50) {
    //     $('.fixed-shadow').addClass('newClass');
    //     $('.fixed-name-scroll').show();
    //   } else {
    //     $('.fixed-shadow').removeClass('newClass');
    //     $('.fixed-name-scroll').hide();
    //   }
    // });

  }



  loadStore() {
    this.loading = true;
    this.storeDetail = null;
    this.storeDetailServ.storeDetail(this.storeId).pipe(finalize(() => this.loading = false)).subscribe(storeDetail => {
      storeDetail.categories = storeDetail.categories.sort((c1, c2) => c1.id - c2.id);
      this.storeDetail = storeDetail;
    });
  }

  ngOnDestroy(): void {
    this.routeQueryparamsSubs.unsubscribe();
    this.routeParamsSubs.unsubscribe();
  }

}