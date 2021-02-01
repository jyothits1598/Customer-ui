import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentModalRef } from '../../model/modal';
import { ROUTE_SIGNIN } from '../../routes/routes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.scss']
})
export class LoginPromptComponent implements OnInit {
  loginRoute = ROUTE_SIGNIN;
  wasLoggedIn: boolean;

  constructor(public modalRef: ComponentModalRef<LoginPromptComponent>,
    public authService: AuthService,
    public window: Window,
    public router: Router) { }

  ngOnInit(): void {
    this.wasLoggedIn = this.authService.isLoggedIn
  }

  logout() {
    this.authService.logout();
  }

  goToLogin() {
    this.router.navigateByUrl('/auth/signin');
  }

  logoutWithReload() {
    this.authService.logout();
    if (this.authService.isLoggedIn) this.window.location.reload();
  }

}
