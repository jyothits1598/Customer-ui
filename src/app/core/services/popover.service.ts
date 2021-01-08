import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentPopoverRef, PopoverConfig, PopoverRef } from '../model/popover';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  _viewContainerRef: ViewContainerRef;
  _renderer: Renderer2

  initialize(viewContainerRef: ViewContainerRef, renderer: Renderer2) {
    this._viewContainerRef = viewContainerRef;
    this._renderer = renderer;
  }

  constructor(private overlay: Overlay,
    private injector: Injector) { }

  registerRenderer() {

  }

  openTemplatePopover(origin: ElementRef, template: TemplateRef<any>, config: PopoverConfig = null) {
    //set up overlay configuration
    let overlayConfig = new OverlayConfig();
    // overlayConfig.hasBackdrop = config.hasBackdrop === false ? false : true;
    overlayConfig.hasBackdrop = false;
    overlayConfig.positionStrategy = this.overlay.position().flexibleConnectedTo(origin.nativeElement).withPositions(this.generatePositions(config));

    let overLayRef = this.overlay.create(overlayConfig);
    // overLayRef.backdropClick().subscribe(e => { popoverRef.dismiss() });
    let popoverRef = new PopoverRef(overLayRef);
    if (config.onDismiss) { popoverRef.onDismiss = config.onDismiss; }
    let tempPortal = new TemplatePortal(template, this._viewContainerRef, { $implicit: popoverRef });
    overLayRef.attach(tempPortal);

    if (true) {
      let unListen;
      setTimeout(() => {
        unListen = this._renderer.listen('document', 'click', (e) => { if (!overLayRef.overlayElement.contains(e.target)) popoverRef.dismiss(); })
      }, 100);

      // add outside click 
      if (popoverRef.onDismiss) {
        let onDisFun = popoverRef.onDismiss;
        popoverRef.onDismiss = () => {
          onDisFun();
          unListen();
        }
      } else {
        popoverRef.onDismiss = () => { unListen() }
      }
    }
    return popoverRef;
    // document.addEventListener('click', (event) => { console.log('called click event handler, ', overLayRef.overlayElement.contains(<HTMLElement>(event.target)), event.target) })
  }

  openComponentPopover(origin: ElementRef, component: any, config: PopoverConfig = null) {
    let overlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    overlayConfig.positionStrategy = this.overlay.position().flexibleConnectedTo(origin.nativeElement).withPositions(this.generatePositions(config));
    let overlayRef = this.overlay.create(overlayConfig);
    let popoverRef = new ComponentPopoverRef(overlayRef, null);
    let compPortal = new ComponentPortal(component, null, this.createInjector(popoverRef, this.injector));
    overlayRef.backdropClick().subscribe(e => { popoverRef.dismiss() })
    popoverRef.instance = overlayRef.attach(compPortal);
    return popoverRef;
  }

  private createInjector(popoverRef: PopoverRef, injector: Injector) {
    const tokens = new WeakMap([[ComponentPopoverRef, popoverRef]]);
    return new PortalInjector(injector, tokens);
  }

  private generatePositions(popConfig: PopoverConfig): Array<ConnectedPosition> {
    let overlayPos: ConnectedPosition;

    if (popConfig) {
      overlayPos = {
        originX: popConfig.xPos,
        originY: popConfig.yPos,
        overlayX: popConfig.xPos,
        overlayY: null
      }

      switch (popConfig.yPos) {
        case 'top':
          overlayPos.overlayY = 'bottom'
          break;
        case 'bottom':
          overlayPos.overlayY = 'top'
          break;
        default: overlayPos.overlayY = 'center'
      }
      // originX: 'start' | 'center' | 'end';
      // originY: 'top' | 'center' | 'bottom';
      // overlayX: 'start' | 'center' | 'end';
      // overlayY: 'top' | 'center' | 'bottom';
    }
    return overlayPos ? [overlayPos] : [];
  }


}
