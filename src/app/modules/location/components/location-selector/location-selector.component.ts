import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ComponentModalRef } from 'src/app/core/model/modal';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { LocationPanelComponent } from '../location-panel/location-panel.component';
import { LocationSearchComponent } from '../location-search/location-search.component';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit {
  constructor(private modalService: ModalService,
    private geoLocationService: GeoLocationService) { }
  compModal: ComponentModalRef;
  location;
  ngOnInit(): void {
    this.geoLocationService.userLocation().subscribe((location) => {
      this.location = location;
    })
  }

  showSelectorModal() {
    this.modalService.openComponentModal(LocationPanelComponent);
  }

}
