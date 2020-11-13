import { Component, OnInit } from '@angular/core';
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

  constructor(public modalRef: ComponentModalRef,
    public authService: AuthService,
    public window: Window) { }

  ngOnInit(): void {
    this.wasLoggedIn = this.authService.isLoggedIn
  }

  logout() {
    this.authService.logout();
  }

  logoutWithReload() {
    this.authService.logout();
    this.window.location.reload();
  }

}
