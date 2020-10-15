import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ModalRef } from '../model/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  _viewContainerRef: ViewContainerRef;

  registerViewContainer(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef
  }

  constructor(private overlay: Overlay) { }

  openTemplateModal(template: TemplateRef<any>) {
    let config = new OverlayConfig();
    config.hasBackdrop = true;
    config.positionStrategy = this.overlay.position().global().centerHorizontally().top('75px');

    let overLayRef = this.overlay.create(config);
    let modalRef = new ModalRef(overLayRef);
    let tempPortal = new TemplatePortal(template, this._viewContainerRef, {$implicit: modalRef});
    overLayRef.attach(tempPortal);

    return modalRef;
  }
}
