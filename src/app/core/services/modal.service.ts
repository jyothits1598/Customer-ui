import { ComponentFactoryResolver, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ComponentModalRef, ModalRef } from '../model/modal';
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

  openTemplateModal(template: TemplateRef<any>) {
    let config = new OverlayConfig();
    config.hasBackdrop = true;
    config.positionStrategy = this.overlay.position().global().centerHorizontally().top('75px');

    let overLayRef = this.overlay.create(config);
    let modalRef = new ModalRef(overLayRef);
    let tempPortal = new TemplatePortal(template, this._viewContainerRef, { $implicit: modalRef });
    overLayRef.attach(tempPortal);

    return modalRef;
  }

  openComponentModal(component) {
    let config = new OverlayConfig();
    config.hasBackdrop = true;
    config.positionStrategy = this.overlay.position().global().centerHorizontally().top('75px');
    // let componentFactory = this.resolver.resolveComponentFactory(component);
    // componentFactory.
    let overLayRef = this.overlay.create(config);

    let modalRef = new ComponentModalRef(overLayRef, null);
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
