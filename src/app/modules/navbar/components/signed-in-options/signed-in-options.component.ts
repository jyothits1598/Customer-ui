import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PopoverService } from 'src/app/core/services/popover.service';

@Component({
  selector: 'signed-in-options',
  templateUrl: './signed-in-options.component.html',
  styleUrls: ['./signed-in-options.component.scss']
})
export class SignedInOptionsComponent implements OnInit {
  @ViewChild('lineIcon', { read: ElementRef }) icon: ElementRef;
  constructor(private popover: PopoverService, private authService: AuthService,
    private window: Window) { }

  ngOnInit(): void {
  }

  showPopover(template: TemplateRef<any>) {
    this.popover.openTemplatePopover(this.icon, template, { xPos: 'end', yPos: 'bottom', darkBackground: true });
  }

  logout() {
    // this.router.navigateByUrl('/');
    this.authService.logout();
    this.window.location.reload();
  }

}
