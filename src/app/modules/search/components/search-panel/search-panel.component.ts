import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentPopoverRef, PopoverRef } from 'src/app/core/model/popover';

@Component({
  selector: 'search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Input() results: Array<string>;
  @Input() searchTerm: string;
  @Output() selectedItem = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void { }

  handleClick() {
    
  }

}
