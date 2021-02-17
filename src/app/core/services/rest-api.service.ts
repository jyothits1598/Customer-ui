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
      map((r: any) => r.data),
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

  patch<T = any>(url, data, showError = true): Observable<BackendResponse<T>> {
    return this.http.patch<BackendResponse<T>>((API_URL_LINK + url), data).pipe(
      take(1),
      catchError((httpError) => this.handleError(httpError, showError))
    );
  }

  put<T = any>(url, data, showError = true): Observable<any> {
    return this.http.put<BackendResponse<T>>((API_URL_LINK + url), data).pipe(
      take(1),
      catchError((httpError) => this.handleError(httpError, showError))
    );
  }

  delete(url) {
    return this.http.delete(API_URL_LINK + url).pipe(
      take(1),
      catchError((httpError) => throwError(httpError.error))
    )
  }

  readError(e: BackendErrorResponse): string {
    // console.log('called read error, ', e, Object.values(e.errors)[0][0])
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
