import { AfterContentInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, Optional, ɵɵresolveBody } from '@angular/core';
import { windowTime } from 'rxjs/operators';
import { ComponentModalRef, ModalRef } from 'src/app/core/model/modal';
import { ComponentPopoverRef } from 'src/app/core/model/popover';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  @Input() store: { id: number, name: string };
  @Input() isIconBlack: boolean;

  @ViewChild('urlCopyInput', { read: ElementRef }) urlCopyInput: ElementRef;

  caption: string;
  url: string;
  linkedCopied: false;
  showpopup:boolean = false;
  modalRef: ModalRef;

  constructor(private popoverService: PopoverService,
    private modalService: ModalService,
    private window: Window) { }

  ngOnInit(): void {
    if (this.store) {
      this.caption = `Check out ${this.store.name} on menuzapp!`;
      this.url = this.window.location.origin + '/restaurants/' + this.store.id;
    }
  }

  showModal(temp: TemplateRef<any>) {
    this.modalRef = this.modalService.openTemplateModal(temp);
  }

  fbShare() {
    console.log(this.url);
    FB.ui({
      method: 'share',
      href: this.url,
      quote: this.caption
    })
    // window.open(`https://www.facebook.com/sharer/sharer.php?u=#${this.url ? this.url : this.window.location.href}`);
  }

  copyUrl() {
    this.urlCopyInput.nativeElement.select();
    this.window.document.execCommand('copy');
    this.showpopup = true;
  }

  close() {
    this.modalRef.dismiss();
  }
}
