import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { ComponentPopoverRef, PopoverConfig, PopoverRef } from '../model/popover';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  _viewContainerRef: ViewContainerRef;

  registerViewContainer(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef
  }

  constructor(private overlay: Overlay,
    private injector: Injector) { }

  openTemplatePopover(origin: ElementRef, template: TemplateRef<any>, config: PopoverConfig = null) {
    let overlayConfig = new OverlayConfig();
    overlayConfig.hasBackdrop = true;
    if(!config?.darkBackground) overlayConfig.backdropClass = "";
    overlayConfig.positionStrategy = this.overlay.position().flexibleConnectedTo(origin.nativeElement).withPositions(this.generatePositions(config));

    let overLayRef = this.overlay.create(overlayConfig);
    let popoverRef = new PopoverRef(overLayRef);
    if (config.onDismiss) popoverRef.onDismiss = config.onDismiss;
    overLayRef.backdropClick().subscribe(e => { popoverRef.dismiss() });
    let tempPortal = new TemplatePortal(template, this._viewContainerRef, { $implicit: popoverRef });
    overLayRef.attach(tempPortal);
    return popoverRef;
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
