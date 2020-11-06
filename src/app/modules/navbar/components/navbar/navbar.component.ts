import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedin$: Observable<boolean>;
  constructor(private authService: AuthService,
    private window: Window, 
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.isLoggedin$ = this.authService.isLoggedIn$();
  }

  handleFocus(){
    console.log('focused');
  }

  handleBlur(){
    console.log('blurred');
  }

  logout() {
    // this.router.navigateByUrl('/');
    this.authService.logout();
    this.window.location.reload();
  }

}
