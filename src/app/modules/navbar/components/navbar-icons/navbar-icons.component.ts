import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'navbar-icons',
  templateUrl: './navbar-icons.component.html',
  styleUrls: ['./navbar-icons.component.scss']
})
export class NavbarIconsComponent implements OnInit, OnDestroy {
  isLoggedin: boolean;
  isActive:string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) { 
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
}
