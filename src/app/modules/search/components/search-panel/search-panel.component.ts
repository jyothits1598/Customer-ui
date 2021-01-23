import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchDataService } from '../../services/search-data.service';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
})
export class SearchPanelComponent implements OnInit {
  @Input() results: Array<any>;
  @Input() searchTerm: string;
  @Output() selectedItem = new EventEmitter<string>();

  history: Array<string>;

  constructor(private searchDataServ: SearchDataService) {}

  ngOnInit(): void {
    this.history = this.searchDataServ.getHistory();
  }

  handleClick(term: string) {
    console.log('handle click inside seach pannel called', term);
    this.selectedItem.emit(term);
    if (term) this.searchDataServ.addItem(term);
  }
}
