import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';

@Injectable({ providedIn: 'root' })
export class HttpHeaderInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;
  token: string;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
      if (isLoggedIn) this.token = this.authService.token;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      headers: this.getHeaders()
    }));
  }

  getHeaders(): HttpHeaders {
    if (this.isLoggedIn) return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': this.token
    })
    else return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  }
}