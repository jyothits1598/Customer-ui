import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SearchHistoryComponent } from './search-history/search-history.component';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Input() results: Array<string>;
  @Input() searchTerm: string;
  @Output() selectedItem = new EventEmitter<string>();

  @ViewChild('sHistory', { read: SearchHistoryComponent }) historyComp: SearchHistoryComponent
  constructor() { }

  ngOnInit(): void { }

  handleClick(term: string) {
    this.selectedItem.emit(term);
    if(term) this.historyComp.addItem(term);
  }

}
