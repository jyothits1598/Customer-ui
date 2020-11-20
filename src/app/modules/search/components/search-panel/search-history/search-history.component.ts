import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  storageKey = 'searchHistory'
  searchHistory: Array<string>;

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.searchHistory = this.storage.get(this.storageKey) || ['search item 1', 'search item 2'];
  }

  addItem(searchTerm: string) {
    this.searchHistory.push(searchTerm);
    this.storage.store(this.storageKey, this.searchHistory);
  }

}
