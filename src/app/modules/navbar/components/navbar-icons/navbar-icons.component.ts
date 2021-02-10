import { Component, HostListener, OnDestroy, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { filter, map, takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'navbar-icons',
  templateUrl: './navbar-icons.component.html',
  styleUrls: ['./navbar-icons.component.scss']
})
export class NavbarIconsComponent implements OnInit, OnDestroy {
  isLoggedin: boolean;
  isActive: string = '';
  windowScrolled: boolean;
  isAtHome: boolean = false;

  unSub$ = new Subject<true>();

  constructor(
    private authService: AuthService,
    private router: Router, @Inject(DOCUMENT) private document: Document) {
    router.events.pipe(
      takeUntil(this.unSub$),
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => e.url === '/')).subscribe((c) => this.isAtHome = c);

    //handles page refresh as the navend event is not fired
    this.isAtHome = this.router.url === '/';
  }


  ngOnInit(): void {
    this.authService.isLoggedIn$().pipe(takeUntil(this.unSub$)).subscribe(state => this.isLoggedin = state);
  }

  ngOnDestroy(): void {
    this.unSub$.next(true);
    this.unSub$.complete();
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
