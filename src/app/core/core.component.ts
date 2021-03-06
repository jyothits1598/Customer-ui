import { Component, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { SearchDataService } from '../modules/search/services/search-data.service';
import { LayoutComponent } from './pages/layout/layout.component';
import { LayoutService } from './services/layout.service';
import { ModalService } from './services/modal.service';
import { OrdersService } from './services/orders.service';
import { PopoverService } from './services/popover.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private popoverService: PopoverService,
    private vCRef: ViewContainerRef,
    private renderer: Renderer2,
    private lSrv: LayoutService
  ) {
    this.modalService.registerViewContainer(this.vCRef);
    this.popoverService.initialize(this.vCRef, this.renderer);
    this.lSrv.registerRenderer(this.renderer);
  }

  ngOnInit(): void { }
}
