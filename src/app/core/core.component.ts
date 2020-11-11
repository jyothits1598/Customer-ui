import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from './services/modal.service';
import { PopoverService } from './services/popover.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private modalService: ModalService,
    private popoverService: PopoverService,
    private vCRef: ViewContainerRef
  ) {
    this.modalService.registerViewContainer(this.vCRef);
    this.popoverService.registerViewContainer(this.vCRef)
  }

  ngOnInit(): void {
  }

}
