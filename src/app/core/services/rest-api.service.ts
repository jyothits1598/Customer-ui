import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { API_URL_LINK } from 'src/environments/environment';
import { BackendErrorResponse, BackendResponse } from '../model/backend-resp';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  hostURL = API_URL_LINK;

  constructor(
    private http: HttpClient,
    private sbSrv: SnackBarService
  ) {
  }

  get<T = any>(url, showError = true): Observable<T> {
    return this.http.get<T>(API_URL_LINK + url).pipe(
      take(1),
      catchError((httpError) => this.handleError(httpError, showError)
      )
    );
  }

  post<T = any>(url, data, showError = true): Observable<BackendResponse<T>> {
    return this.http.post<BackendResponse<T>>((API_URL_LINK + url), data).pipe(
      take(1),
      catchError((httpError) => this.handleError(httpError, showError))
    );
  }

  patch(url, data): Observable<any> {
    return this.http.patch((API_URL_LINK + url), data).pipe(
      take(1),
      catchError((httpError) => throwError(httpError.error))
    );
  }

  put(url, data): Observable<any> {
    return this.http.put((API_URL_LINK + url), data).pipe(
      take(1),
      catchError((httpError) => throwError(httpError.error))
    );
  }

  delete(url) {
    return this.http.delete(API_URL_LINK + url).pipe(
      take(1),
      catchError((httpError) => throwError(httpError.error))
    )
  }

  readError(e: BackendErrorResponse): string {
    return Object.values(e.errors)[0][0];
  }

  handleError(error: HttpErrorResponse, showError: boolean) {
    if (error.error instanceof ProgressEvent) {
      //client side error
      this.sbSrv.error('There was a network error.');
    } else {
      //backend returning error
      if (showError) this.sbSrv.error(this.readError(error.error));
    }
    let e = error.error;
    e.status = error.status;
    return throwError(e);
  }

}
