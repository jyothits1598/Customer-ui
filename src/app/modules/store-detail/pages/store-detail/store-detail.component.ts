import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { StoreDetail, StoreItem } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit, OnDestroy {
  storeId: number;
  selectedItem: StoreItem;
  showItemDetail: boolean = false;

  intersectionObserver: IntersectionObserver;
  storeDetail: StoreDetail;
  loading: boolean = true;
  error: boolean = false;
  selectedTab: string;

  routeParamsSubs;
  routeQueryparamsSubs;

  @ViewChildren('categorySections') sections: QueryList<ElementRef>;
  constructor(private storeDetailServ: StoreDetailDataService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.routeParamsSubs = this.route.params.subscribe((param) => {
      let id = parseInt(param.id);
      if (id) {
        this.storeId = id;
        this.loadStore();
      }
    });

    this.routeQueryparamsSubs = this.route.queryParams.subscribe((qParams) => {
      this.showItemDetail = qParams.i;    
    })
  }

  loadStore() {
    this.loading = true;
    this.storeDetail = null;
    this.storeDetailServ.storeDetail(this.storeId).pipe(finalize(() => this.loading = false)).subscribe(storeDetail => {
      this.storeDetail = storeDetail;
      this.initiateObservation();
    });
  }

  initiateObservation() {
    let config = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    }
    if (this.storeDetail.categories.length > 0) {
      this.selectedTab = this.storeDetail.categories[0].name;
      setTimeout(() => {
        this.intersectionObserver = new IntersectionObserver((e) => {
          for (let i = 0; i < e.length; i++) {
            if (e[i].isIntersecting) { this.selectedTab = e[i].target.id; return; }
          }
        }, config);

        this.sections.forEach(ne => this.intersectionObserver.observe(ne.nativeElement))
      }, 0);
    }
  }

  handleTabClick(index: number) {
    this.sections.toArray()[index].nativeElement.scrollIntoView();
  }

  ngOnDestroy(): void {
    this.routeQueryparamsSubs.unsubscribe();
    this.routeParamsSubs.unsubscribe();
  }

}