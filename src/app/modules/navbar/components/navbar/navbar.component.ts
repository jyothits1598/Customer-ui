import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { NavbarService } from '../../services/navbar.service';
import { SearchDataService } from 'src/app/modules/search/services/search-data.service';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoggedin$: Observable<boolean>;
  template: TemplateRef<any>;

  //view reference will be stored only when the location selector view has been detached
  locationViewRef: ViewRef;

  @ViewChild('locationTemp', { read: TemplateRef })
  locationTemplate: TemplateRef<any>;
  @ViewChild('vCont', { read: ViewContainerRef })
  containerRef: ViewContainerRef;

  lastScrollYPos = window.pageYOffset;

  private finalise$ = new Subject<void>();

  private prevYPos = 0;
  private prevScrollDir = Direction.DOWN;
  private scrolledDistance = 0;
  private limit = 150;
  private isShowing = true;

  navbarStyle$ = new BehaviorSubject<Object>({
    top: '0em',
    position: 'fixed',
    transition: 'top 0.3s',
  });

  templateSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private layoutService: LayoutService,
    private navbarService: NavbarService,
    private cdr: ChangeDetectorRef,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    this.isLoggedin$ = this.authService.isLoggedIn$();

    this.scrollService.scrollY$
      .pipe(
        takeUntil(this.finalise$),
        map((newYPos) => {
          console.log('newYPos: ', newYPos);
          const newScrollDir =
            newYPos > this.prevYPos ? Direction.DOWN : Direction.UP;

          const scrollChanged = newScrollDir !== this.prevScrollDir;

          if (scrollChanged) {
            this.scrolledDistance = 0;
          } else {
            this.scrolledDistance += newYPos - this.prevYPos;
          }

          if (this.isShowing && this.scrolledDistance > this.limit) {
            this.isShowing = false;
            console.log('hiding...');
            this.navbarStyle$.next({
              top: '-8em',
              position: 'fixed',
              transition: 'top 0.3s',
            });
          } else if (
            newYPos < this.limit ||
            (!this.isShowing && this.scrolledDistance < -this.limit)
          ) {
            console.log('showing!');
            this.isShowing = true;
            this.navbarStyle$.next({
              top: '0em',
              position: 'fixed',
              transition: 'top 0.3s',
            });
          }

          this.prevScrollDir = newScrollDir;
          this.prevYPos = newYPos;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.containerRef.createEmbeddedView(this.locationTemplate);
    this.templateSubs = this.navbarService.headingTemplate$.subscribe(
      (temp) => {
        if (temp) {
          this.locationViewRef = this.containerRef.detach();
          this.containerRef.createEmbeddedView(temp);
        } else {
          if (this.locationViewRef) {
            this.containerRef.remove();
            this.containerRef.insert(this.locationViewRef);
            this.locationViewRef = null;
          }
        }
        this.cdr.detectChanges();
      }
    );
  }

  debug() {
    if (this.locationViewRef) {
      this.containerRef.insert(this.locationViewRef);
      this.locationViewRef = null;
    } else {
      this.locationViewRef = this.containerRef.detach();
    }
  }

  ngOnDestroy(): void {
    this.templateSubs.unsubscribe();
  }

  ShouldShoWSearch() {
    // return !((this.router.url !== '/' || !this.router.url.includes('/search')) && this.layoutService.isMobile);
    return (
      !this.layoutService.isMobile ||
      this.router.url === '/' ||
      this.router.url.includes('/search')
    );
  }
}

enum Direction {
  UP,
  DOWN,
}
