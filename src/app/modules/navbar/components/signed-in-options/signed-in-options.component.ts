import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { PopoverRef } from 'src/app/core/model/popover';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { PopoverService } from 'src/app/core/services/popover.service';

@Component({
  selector: 'signed-in-options',
  templateUrl: './signed-in-options.component.html',
  styleUrls: ['./signed-in-options.component.scss']
})
export class SignedInOptionsComponent implements OnInit, OnDestroy {
  @ViewChild('lineIcon', { read: ElementRef }) icon: ElementRef;
  unListen: any;
  popoverRef: PopoverRef;
  profileRouteActive;

  unSub$ = new Subject<true>();
  constructor(private popover: PopoverService,
    private authService: AuthService,
    private renderer: Renderer2,
    private window: Window,
    private router: Router) { }

  ngOnDestroy(): void {
    if (this.unListen) this.unListen();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      switchMap((e: NavigationEnd) => of(e.url.includes('/profile/'))),
      takeUntil(this.unSub$)
    ).subscribe(c => this.profileRouteActive = c);
  }

  setupListener() {
    setTimeout(() => {
      this.unListen = this.renderer.listen(window, 'click', (e) => { this.closePopover(); });
    }, 0);
  }

  showPopover(template: TemplateRef<any>) {
    if (this.popoverRef) return;
    this.popoverRef = this.popover.openTemplatePopover(this.icon, template, { xPos: 'end', yPos: 'bottom', hasBackdrop: false });
    this.setupListener();
  }

  closePopover() {
    this.popoverRef.dismiss();
    this.unListen();
    this.popoverRef = null;
  }

  logout() {
    // this.router.navigateByUrl('/');
    this.window.location.href = '/';
    this.authService.logout();
  }

}
