import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StoreDetail } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
  storeId: number;

  intersectionObserver: IntersectionObserver;
  storeDetail: StoreDetail;
  loading: boolean = true;
  error: boolean = false;
  selectedTab: string;


  @ViewChildren('categorySections') sections: QueryList<ElementRef>;
  constructor(private storeDetailServ: StoreDetailDataService,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.params.subscribe((param) => {
      let id = parseInt(param.id);
      if (id) {
        this.storeId = id;
        this.loadStore();
      }
    });
    // this.storeDetailServ.storeDetail().pipe(finalize(() => this.loading = false)).subscribe(storeDetail => {
    //   this.storeDetail = storeDetail;
    //   this.initiateObservation();
    // });
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
          console.log('intersected ', e)
          for (let i = 0; i < e.length; i++) {
            if (e[i].isIntersecting) { this.selectedTab = e[i].target.id; return; }
          }
        }, config);

        this.sections.forEach(ne => this.intersectionObserver.observe(ne.nativeElement))
      }, 0);
    }
  }

  handleTabClick(index: number) {
    this.sections.toArray()[index].nativeElement.scrollIntoView({ behavior: "smooth",  block: "nearest" });
  }
}