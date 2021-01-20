import { ElementRef, Injectable } from '@angular/core';
import { NativeElementInjectorDirective } from 'ngx-intl-tel-input';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  storageKey = 'searchHistory';
  searchHistory: Array<string>;
  searchInputElem: ElementRef;

  overlayOpen = false;

  constructor(private storageService: StorageService) {
    this.searchHistory = this.storageService.get(this.storageKey) || [];
  }

  getHistory() {
    return this.searchHistory;
  }

  addItem(searchTerm: string) {
    if (!this.searchHistory.includes(searchTerm)) {
      if (this.searchHistory.length < 3) this.searchHistory.unshift(searchTerm);
      else
        this.searchHistory = [searchTerm, ...this.searchHistory.splice(1, 2)];
      this.storageService.store(this.storageKey, this.searchHistory);
    }
  }

  registerSearchElement(elem: ElementRef) {
    this.searchInputElem = elem;
  }

  clearSearch() {
    if (this.searchInputElem) this.searchInputElem.nativeElement.value = '';
  }
}
