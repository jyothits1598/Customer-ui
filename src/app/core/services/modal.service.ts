import { ComponentFactoryResolver, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ComponentModalRef, ModalConfig, ModalRef } from '../model/modal';
import { Component } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  _viewContainerRef: ViewContainerRef;

  registerViewContainer(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef
  }

  constructor(private overlay: Overlay,
    private resolver: ComponentFactoryResolver,
    private injector: Injector) { }

  openTemplateModal(template: TemplateRef<any>, config: ModalConfig = null) {
    let overlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.positionStrategy = config?.yPosition ? this.overlay.position().global().centerHorizontally().top(config.yPosition) : this.overlay.position().global().centerHorizontally().centerVertically();

    let overLayRef = this.overlay.create(overlayConfig);
    // overLayRef.backdropClick().subscribe(() => { overLayRef.dismiss() })
    let modalRef = new ModalRef(overLayRef);
    let tempPortal = new TemplatePortal(template, this._viewContainerRef, { $implicit: modalRef });
    overLayRef.attach(tempPortal);

    return modalRef;
  }

  openComponentModal(component: any, config: ModalConfig = null) {
    let modalConfig = new OverlayConfig();
    modalConfig.hasBackdrop = true;
    modalConfig.positionStrategy = config?.yPosition ? this.overlay.position().global().centerHorizontally().top(config.yPosition) : this.overlay.position().global().centerHorizontally().centerVertically();

    let overLayRef = this.overlay.create(modalConfig);
    let modalRef = new ComponentModalRef(overLayRef, null);2
    overLayRef.backdropClick().subscribe(() => { modalRef.dismiss() })
    let compPortal = new ComponentPortal(component, null, this.createInjector(modalRef, this.injector));
    let compRef = overLayRef.attach(compPortal);
    modalRef.instance = compRef.instance;
    return modalRef;
  }

  createInjector(modalRef: ModalRef, injector: Injector) {
    const tokens = new WeakMap([[ComponentModalRef, modalRef]]);
    return new PortalInjector(injector, tokens);
  }
}
