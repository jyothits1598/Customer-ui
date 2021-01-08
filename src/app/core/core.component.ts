import { Component, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
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
    private vCRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
    this.modalService.registerViewContainer(this.vCRef);
    this.popoverService.initialize(this.vCRef, this.renderer)
  }

  ngOnInit(): void {
  }

}
