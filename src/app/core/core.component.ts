import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(private modalService: ModalService,
    private vCRef: ViewContainerRef) {
    modalService.registerViewContainer(this.vCRef);
  }

  ngOnInit(): void {
  }

}
