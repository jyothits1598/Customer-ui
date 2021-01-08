import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SearchDataService } from '../../services/search-data.service';
import { SearchHistoryComponent } from './search-history/search-history.component';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Input() results: Array<any>;
  @Input() searchTerm: string;
  @Output() selectedItem = new EventEmitter<string>();

  constructor(private searchDataServ: SearchDataService) { }

  ngOnInit(): void { }

  handleClick(term: string) {
    console.log('handle click inside seach pannel called', term);
    this.selectedItem.emit(term);
    if(term) this.searchDataServ.addItem(term);
  }

}
