import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginPromptComponent } from '../components/login-prompt/login-prompt.component';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersGuard implements CanActivate {

  constructor(private authSrv: AuthService,
    private router: Router,
    private modalSrv: ModalService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authSrv.isLoggedIn) {
      // this.modalSrv.openComponentModal(LoginPromptComponent)
      this.router.navigateByUrl('/auth/signin');
      return false;
    }
    return true;
  }

}
