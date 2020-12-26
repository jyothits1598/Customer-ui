import { AfterContentInit, Component, ElementRef, OnInit, TemplateRef } from '@angular/core';
import { windowTime } from 'rxjs/operators';
import { PopoverService } from 'src/app/core/services/popover.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  popRef = null;

  constructor(private popoverService: PopoverService,
    private elementRef: ElementRef,
    private window: Window) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  showPopover(temp: TemplateRef<any>) {
    this.popRef = this.popoverService.openTemplatePopover(this.elementRef, temp, {
      xPos: 'end',
      yPos: 'bottom',
      // onDismiss?: () => void;
      hasBackdrop: true,
      darkBackground: false,
      outSideClick: true
    });
  }

  fbShare() {
    let url = this.window.location.href;
    console.log('fb share url - ', url)
    FB.ui({
      method: 'share',
      href: url
    })
  }

}
