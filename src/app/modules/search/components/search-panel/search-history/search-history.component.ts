import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { SearchDataService } from '../../../services/search-data.service';
import { StoreSearchInlineComponent } from '../../store-search-inline/store-search-inline.component';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  @Output() selectedItem = new EventEmitter<string>();
  history: Array<string>;

  constructor(private searchService: SearchDataService) { }

  ngOnInit(): void {
    this.history = this.searchService.getHistory();
  }



}
