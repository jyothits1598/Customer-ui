import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable()
export class SearchDataService {
  storageKey = 'searchHistory'
  searchHistory: Array<string>;

  constructor(private storageService: StorageService) {
    this.searchHistory = this.storageService.get(this.storageKey) || [];
    console.log('this is the constructor', this.searchHistory);
  }

  getHistory() {
    return this.searchHistory;
  }

  addItem(searchTerm: string) {
    if (!this.searchHistory.includes(searchTerm)) {
      if (this.searchHistory.length < 3) this.searchHistory.unshift(searchTerm);
      else this.searchHistory = [searchTerm, ...this.searchHistory.splice(1, 2)]
      this.storageService.store(this.storageKey, this.searchHistory);
    }

  }

}
