import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { NavbarService } from '../../services/navbar.service';

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

  templateSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private layoutService: LayoutService,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.isLoggedin$ = this.authService.isLoggedIn$();
  }

  ngAfterViewInit(): void {
    /*
    this.containerRef.createEmbeddedView(this.locationTemplate)
    this.templateSubs = this.navbarService.headingTemplate$.subscribe(
      (temp) => {
        if (temp) {
          this.locationViewRef = this.containerRef.detach();
          this.containerRef.createEmbeddedView(temp);
        } else {
          if (this.locationViewRef) { 
            this.containerRef.remove();
            this.containerRef.insert(this.locationViewRef); 
            this.locationViewRef = null 
          }
        }
      }
    );*/
  }

  debug() {
    if (this.locationViewRef) {
      this.containerRef.insert(this.locationViewRef);
      this.locationViewRef = null;
    } else {
      this.locationViewRef = this.containerRef.detach();
    }
  }

  ShouldShoWSearch() {
    return !(this.router.url !== '/' && this.layoutService.isMobile);
  }

  ngOnDestroy(): void {
    this.templateSubs.unsubscribe();
  }
}
