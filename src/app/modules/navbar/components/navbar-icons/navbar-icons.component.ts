import { Component, HostListener, OnDestroy, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'navbar-icons',
  templateUrl: './navbar-icons.component.html',
  styleUrls: ['./navbar-icons.component.scss']
})
export class NavbarIconsComponent implements OnInit, OnDestroy {
  isLoggedin: boolean;
  isActive:string = '';
  windowScrolled: boolean;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,@Inject(DOCUMENT) private document: Document) { 
      // if(this.route.snapshot.queryParams['favourites']){
      //   this.isActive = this.route.snapshot.queryParams['favourites'];
      //   console.log(this.isActive);
      // }
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
