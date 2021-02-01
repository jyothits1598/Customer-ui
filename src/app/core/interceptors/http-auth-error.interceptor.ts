import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { LoginPromptComponent } from '../components/login-prompt/login-prompt.component';

@Injectable()
export class HttpAuthErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private modalService: ModalService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error == 'Unauthorized.') {
                    // this.modalService.openComponentModal(LoginPromptComponent);
                    this.router.navigateByUrl('/auth/signin');
                }
                return throwError(error);
            })
        )

    }

}