import { ComponentFactoryResolver, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ComponentModalRef, ModalConfig, ModalRef } from '../model/modal';
import { Component } from '@angular/compiler/src/core';
import { LayoutService } from './layout.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
    private injector: Injector,
    private lSrv: LayoutService,
    private router: Router) { }

  openTemplateModal(template: TemplateRef<any>, config: ModalConfig = null) {
    this.lSrv.disableScroll();

    let overlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.positionStrategy = config?.yPosition ? this.overlay.position().global().centerHorizontally().top(config.yPosition) : this.overlay.position().global().centerHorizontally().centerVertically();

    let overLayRef = this.overlay.create(overlayConfig);
    let clkSubs = overLayRef.backdropClick().subscribe(() => { modalRef.dismiss() });
    let rtSubs = this.router.events.subscribe(() => modalRef.dismiss())
    let modalRef = new ModalRef(overLayRef);
    modalRef.data = config?.data;
    modalRef.onDismiss = () => { clkSubs.unsubscribe(), rtSubs.unsubscribe(); this.lSrv.resetScroll(); }
    let tempPortal = new TemplatePortal(template, this._viewContainerRef, { $implicit: modalRef });
    overLayRef.attach(tempPortal);

    return modalRef;
  }

  openComponentModal(component: any, config: ModalConfig = null) {
    // let modalConfig = new OverlayConfig();
    // modalConfig.hasBackdrop = true;
    // modalConfig.positionStrategy = config?.yPosition ? this.overlay.position().global().centerHorizontally().top(config.yPosition) : this.overlay.position().global().centerHorizontally().centerVertically();

    // let overLayRef = this.overlay.create(modalConfig);
    // let modalRef = new ComponentModalRef(overLayRef, null);
    this.lSrv.disableScroll();

    let overlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.positionStrategy = config?.yPosition ? this.overlay.position().global().centerHorizontally().top(config.yPosition) : this.overlay.position().global().centerHorizontally().centerVertically();

    let overLayRef = this.overlay.create(overlayConfig);
    let clkSubs = overLayRef.backdropClick().subscribe(() => { modalRef.dismiss() });
    let rtSubs = this.router.events.subscribe(() => modalRef.dismiss())
    let modalRef = new ComponentModalRef(overLayRef, null);
    modalRef.data = config?.data;
    let compPortal = new ComponentPortal(component, null, this.createInjector(modalRef, this.injector));
    let compRef = overLayRef.attach(compPortal);
    modalRef.onDismiss = () => { clkSubs.unsubscribe(), rtSubs.unsubscribe(); this.lSrv.resetScroll(); }
    modalRef.instance = compRef.instance;
    return modalRef;
  }

  createInjector(modalRef: ModalRef, injector: Injector) {
    const tokens = new WeakMap([[ComponentModalRef, modalRef]]);
    return new PortalInjector(injector, tokens);
  }
}
