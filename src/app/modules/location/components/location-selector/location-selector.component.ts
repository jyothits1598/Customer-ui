import { ElementRef } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentModalRef } from 'src/app/core/model/modal';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { LocationPanelComponent } from '../location-panel/location-panel.component';
import { LocationSearchComponent } from '../location-search/location-search.component';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit {
  @ViewChild('popOrigin', { read: ElementRef }) popOrigin: ElementRef;
  constructor(private geoLocationService: GeoLocationService, private popOverService: PopoverService) { }
  compModal: ComponentModalRef;
  location;
  ngOnInit(): void {
    this.geoLocationService.userLocation().subscribe((location) => {
      this.location = location;
    })
  }

  showSelectorModal() {
    this.popOverService.openComponentPopover(this.popOrigin, LocationPanelComponent, { xPos: 'start', yPos: 'bottom' })
  }

}
