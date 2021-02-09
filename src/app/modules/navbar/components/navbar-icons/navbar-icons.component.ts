import { Component, HostListener, OnDestroy, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'navbar-icons',
  templateUrl: './navbar-icons.component.html',
  styleUrls: ['./navbar-icons.component.scss']
})
export class NavbarIconsComponent implements OnInit, OnDestroy {
  isLoggedin: boolean;
  isActive: string = '';
  windowScrolled: boolean;

  atHome$: Observable<boolean>
  constructor(
    private authService: AuthService,
    private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.atHome$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url === '/'))
  }

  stateSubs: Subscription;

  ngOnInit(): void {
    this.stateSubs = this.authService.isLoggedIn$().subscribe(state => this.isLoggedin = state);
  }

  ngOnDestroy(): void {
    this.stateSubs.unsubscribe();
  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
}
