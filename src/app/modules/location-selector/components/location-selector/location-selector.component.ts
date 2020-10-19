import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';
import { LocationSearchComponent } from '../location-search/location-search.component';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  // showSelectorModal(temp: TemplateRef<any>) {
  //   this.modalService.openTemplateModal(temp)
  // }

}
