import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { StoreItemDetail } from '../../model/store-item-detail';
import { StoreItemDataService } from '../../services/store-item-data.service';

@Component({
  selector: 'store-item-detail',
  templateUrl: './store-item-detail.component.html',
  styleUrls: ['./store-item-detail.component.scss']
})
export class StoreItemDetailComponent implements OnChanges {

  @Input() item: { storeId: number, itemId: number };
  itemDetail: StoreItemDetail
  loading: boolean = true;

  selectedOptions: FormArray;

  constructor(private storeItemData: StoreItemDataService) { }

  show() {
    console.log(this.selectedOptions.value);
    this.selectedOptions.markAllAsTouched();
  }

  ngOnChanges(): void {
    this.storeItemData.itemDetail(this.item.storeId, this.item.itemId).pipe(finalize(() => this.loading = false)).subscribe(detail => {
      this.itemDetail = detail;
      let control = this.itemDetail.modifiers.map((mod) => new FormControl());
      this.selectedOptions = new FormArray(control);
    });
  }

}
