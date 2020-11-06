import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { ComponentPopoverRef, PopoverRef } from 'src/app/core/model/popover';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  @Input() results: Array<string>;
  @Input() searchTerm: string;
  constructor(private popoverRef: PopoverRef) { }

  ngOnInit(): void { }

  handleClick() {
    this.popoverRef.dismiss()
  }

}
