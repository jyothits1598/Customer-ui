import {
  AfterViewInit,
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
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { NavbarService } from '../../services/navbar.service';
import { SearchDataService } from 'src/app/modules/search/services/search-data.service';

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

  lastPinnedYPos = 0;
  lastScrollYPos = window.pageYOffset;

  dynamicPosition$ = new BehaviorSubject<object>({ top: '0px' });

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.layoutService.isMobile) {
      const y = window.pageYOffset;
      if (this.searchDataServ.overlayOpen || y < this.lastScrollYPos) {
        this.dynamicPosition$.next({ top: '0px', transition: 'top 0.2s' });
        this.lastPinnedYPos = y;
      } else {
        this.dynamicPosition$.next({ top: `-${y - this.lastPinnedYPos}px` });
      }
      this.lastScrollYPos = y;
    }
  }

  templateSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private layoutService: LayoutService,
    private navbarService: NavbarService,
    private searchDataServ: SearchDataService
  ) {}

  ngOnInit(): void {
    this.isLoggedin$ = this.authService.isLoggedIn$();
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
