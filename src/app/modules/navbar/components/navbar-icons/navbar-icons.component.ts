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
  url:string;
  active_image:string = "assets/images/navbar/ico_home_active.png";
  inactive_image:string = "assets/images/navbar/ico_home.png";

  fv_active_image:string = "assets/images/navbar/ico_heart_active.png";
  fv_inactive_image:string = "assets/images/navbar/ico_heart.png";

  home_status:boolean = false;
  fav_status:boolean = false;

  home_url:string = "/";
  fav_url:string = "/favourites"; 
  
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
    this.router.events.subscribe(
      (event: any) => { 
        if(event instanceof NavigationEnd) {
          this.home_status = false;
          this.fav_status = false;          
          if(this.router.url && this.router.url.indexOf(this.home_url) > -1){
            console.log(this.home_status);
            this.home_status = true;
          }else if(this.router.url && this.router.url.indexOf(this.fav_url) > -1){
            this.fav_status = true;
          }
        }
      }
    );
  }

  stateSubs: Subscription;
  
  ngOnInit(): void {
    this.stateSubs = this.authService.isLoggedIn$().subscribe(state => this.isLoggedin = state);
  }
  
  ngOnDestroy(): void {
    this.stateSubs.unsubscribe();
  }
}
