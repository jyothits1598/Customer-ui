import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  @Output() selectedItem = new EventEmitter<string>();

  storageKey = 'searchHistory'
  searchHistory: Array<string>;

  constructor(private storage: StorageService) { }

  ngOnInit(): void {
    this.searchHistory = this.storage.get(this.storageKey) || [];
  }

  addItem(searchTerm: string) {
    if (!this.searchHistory.includes(searchTerm)) {
      if (this.searchHistory.length < 3) this.searchHistory.unshift(searchTerm);
      else this.searchHistory = [searchTerm, ...this.searchHistory.splice(1, 2)]
      this.storage.store(this.storageKey, this.searchHistory);
    }

  }

}
