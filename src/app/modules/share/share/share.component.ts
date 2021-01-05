import { AfterContentInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { windowTime } from 'rxjs/operators';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  @ViewChild('popOrigin', { read: ElementRef }) org: ElementRef;
  popRef = null;
  @Input() url: string;
  @Input() isIconBlack: boolean;

  get shareUrl(): string {
    return this.url ? this.url : this.window.location.href;
  }
  constructor(private popoverService: PopoverService,
    private modalService: ModalService,
    private window: Window) { }

  ngOnInit(): void {
  }

  getUrl() {

  }

  showModal(temp: TemplateRef<any>) {
    this.modalService.openTemplateModal(temp);
  }

  showPopover(temp: TemplateRef<any>) {
    this.popRef = this.popoverService.openTemplatePopover(this.org, temp, {
      xPos: 'end',
      yPos: 'bottom',
      // onDismiss?: () => void;
      hasBackdrop: true,
      darkBackground: false,
      outSideClick: true
    });
  }

  fbShare() {
    FB.ui({
      method: 'share',
      href: this.shareUrl
    })
    // window.open(`https://www.facebook.com/sharer/sharer.php?u=#${this.url ? this.url : this.window.location.href}`);
  }

  twtShare() {
    window.open(`http://twitter.com/share?text=Check out this store @ menuzapp&url=${this.shareUrl}&hashtags=menuzapp`);
  }

}
