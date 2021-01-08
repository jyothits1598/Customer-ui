import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-auth-parent',
  templateUrl: './auth-parent.component.html',
  styleUrls: ['./auth-parent.component.scss']
})
export class AuthParentComponent implements OnInit {
  isforgot:boolean = false;
  forgot_url:string = "/auth/forgot-password";

  constructor(private router: Router) { 
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) { 
          this.isforgot = false;
          if(this.router.url && this.router.url.indexOf(this.forgot_url) > -1){
            this.isforgot = true;
          }
        }});
  }

  ngOnInit(): void {
    
  }

}
