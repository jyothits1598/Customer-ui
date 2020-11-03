import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedin$: Observable<boolean>;
  constructor(private authService: AuthService,private window: Window, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedin$ = this.authService.isLoggedIn$();
  }

  logout() {
    // this.router.navigateByUrl('/');
    this.authService.logout();
    this.window.location.reload();
  }

}
