import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { finalize } from 'rxjs/operators';
import { StoreItemDetail } from '../../model/store-item-detail';
import { StoreItemDataService } from '../../services/store-item-data.service';

@Component({
  selector: 'store-item-detail',
  templateUrl: './store-item-detail.component.html',
  styleUrls: ['./store-item-detail.component.scss'],
  animations: [
    trigger('slideIn', [
      transition('void=>*', [
        animate('.2s', keyframes([
          style({ transform: 'translateY(50%)', opacity: 0 }),
          style({ transform: 'translateY(0)', opacity: 1 }),
        ]))
      ]),
      transition('*=>void', [
        animate('.1s', keyframes([
          style({ transform: 'translateY(0)', opacity: 1 }),
          style({ transform: 'translateY(5%)', opacity: 0 }),
        ]))
      ])
    ])
  ]
})
export class StoreItemDetailComponent implements OnChanges, OnDestroy {
  reqSubs: Subscription;
  @Input() item: { storeId: number, itemId: number };
  itemDetail: StoreItemDetail
  loading: boolean = true;
show=true;
  selectedOptions: FormArray;
  sC: boolean = true;

  constructor(private storeItemData: StoreItemDataService,
    private location: Location) { }
    
    ngOnChanges(): void {
    this.reqSubs = this.storeItemData.itemDetail(this.item.storeId, this.item.itemId).pipe(finalize(() => this.loading = false)).subscribe(detail => {
      this.itemDetail = detail;
      let control = this.itemDetail.modifiers.map((mod) => new FormControl());
      this.selectedOptions = new FormArray(control);
    });
  }
  
  close() {
    this.show = false;
    setTimeout(() => {
      this.location.back();
    }, 200);
  }
  
  ngOnDestroy(): void {
    this.reqSubs.unsubscribe();
  }
}
