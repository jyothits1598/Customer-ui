import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { LayoutService } from 'src/app/core/services/layout.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedin$: Observable<boolean>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    console.log('this.router , ', this.router.url);
    this.isLoggedin$ = this.authService.isLoggedIn$();
  }

  ShouldShoWSearch(){
    return !(this.router.url !== '/' && this.layoutService.isMobile);
  }

  handleBlur() {
    console.log('blurred');
  }

}
