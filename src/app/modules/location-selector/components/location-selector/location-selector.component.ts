import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit {
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  showSelectorModal(template: TemplateRef<any>) {
    this.modalService.openTemplateModal(template);
  }

}
