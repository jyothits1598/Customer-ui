import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { HostListener } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[popover]'
})
export class PopoverDirective {

  @HostListener('click', ['$event'])
  handleClick(event: any) {
    console.log(this.template, this.hostElement);
    this.showOverLay();
  }
  @Input() template: TemplateRef<any>

  constructor(public overlay: Overlay,
    private hostElement: ElementRef,
    private vCRef: ViewContainerRef) { }

  // showOverLay() {
  //   let config = new OverlayConfig();
  //   config.hasBackdrop = true;
  //   config.positionStrategy = this.overlay.position().flexibleConnectedTo(this.hostElement.nativeElement).withPositions([{
  //     originX : 'start',
  //     originY : 'bottom',
  //     overlayX: 'center',
  //     overlayY: 'top',
  //   }]).withPush(false);
  //   let overLayRef = this.overlay.create(config);

  //   let tempPortal = new TemplatePortal(this.template, this.vCRef);
  //   overLayRef.attach(tempPortal);
  // }

  showOverLay() {
    let config = new OverlayConfig();
    config.hasBackdrop = true;
    config.positionStrategy = this.overlay.position().flexibleConnectedTo(this.hostElement.nativeElement).withPositions([{
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    }]).withPush(false);
    let overLayRef = this.overlay.create(config);

    let tempPortal = new TemplatePortal(this.template, this.vCRef);
    overLayRef.attach(tempPortal);
  }


}
