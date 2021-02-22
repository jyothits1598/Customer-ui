import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PasswordConfirmationGuard implements CanActivate {
  passwordConfirmed: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.passwordConfirmed) {
      this.passwordConfirmed = false;
      return true
    }
    else { this.router.navigateByUrl('profile/security/current-password' + '?redirect=' + state.url); return false; }
  }

}
