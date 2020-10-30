import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { StoreDetail } from 'src/app/modules/store-detail/model/store-detail';
import { StoreDetailDataService } from '../../services/store-detail-data.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
  intersectionObserver: IntersectionObserver;
  storeDetail: StoreDetail;
  loading: boolean = true;
  error: boolean = false;
  selectedTab: string;


  @ViewChildren('categorySections') sections: QueryList<ElementRef>;
  constructor(private storeDetailServ: StoreDetailDataService) { }

  ngOnInit(): void {
    this.storeDetailServ.storeDetail().pipe(finalize(() => this.loading = false)).subscribe(storeDetail => {
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
    this.selectedTab = this.storeDetail.categories[0].name;
    setTimeout(() => {
      this.intersectionObserver = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) this.selectedTab = e[0].target.id;
      }, config);
      this.sections.forEach(ne => this.intersectionObserver.observe(ne.nativeElement))
    }, 0);
  }

  handleTabClick(index: number){
    this.sections.toArray()[index].nativeElement.scrollIntoView({behavior: "smooth"});
  }
}