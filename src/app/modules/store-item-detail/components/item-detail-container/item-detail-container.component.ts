import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StoreItem } from 'src/app/modules/store-detail/model/store-detail';
import { StoreItemDataService } from '../../services/store-item-data.service';

@Component({
  selector: 'item-detail-container',
  templateUrl: './item-detail-container.component.html',
  styleUrls: ['./item-detail-container.component.scss']
})
export class ItemDetailContainerComponent implements OnChanges {
  @Input() item: StoreItem;
  constructor(private storeItemData: StoreItemDataService) { }

  ngOnChanges(): void {

  }

}
