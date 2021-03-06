import { OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentModalRef, ModalRef } from 'src/app/core/model/modal';
import { PopoverRef } from 'src/app/core/model/popover';
import { UserLocation } from 'src/app/core/model/user-location';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { LocationPanelComponent } from '../location-panel/location-panel.component';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('popOrigin', { read: ElementRef }) popOrigin: ElementRef;
  @ViewChild('locationPanel', { read: TemplateRef }) locationPanel: TemplateRef<any>;

  constructor(
    private geoLocationService: GeoLocationService,
    private layoutService: LayoutService,
    private popOverService: PopoverService,
    private modalService: ModalService) { }

  ngAfterViewInit(): void {
  }

  overlayRef: PopoverRef | ModalRef;
  location: UserLocation;
  unSub$ = new Subject<true>();

  ngOnInit(): void {
    this.geoLocationService.userLocation().pipe(takeUntil(this.unSub$)).subscribe((location) => {
      let loc = location;
      this.location = location;
      if (loc.address.locality.length > 22) loc.address.locality = loc.address.locality.slice(0, 22) + '...';
      this.location = location;
    })
  }

  showSelectorModal() {
    this.overlayRef = this.layoutService.isMobile ?
      this.modalService.openComponentModal(LocationPanelComponent) :
      this.popOverService.openComponentPopover(this.popOrigin, LocationPanelComponent, { xPos: 'start', yPos: 'bottom', disableAutoClose: true, onOutsideClick: () => this.overlayRef.dismiss() });
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
  }
}