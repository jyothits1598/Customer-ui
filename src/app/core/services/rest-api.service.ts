import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { API_URL_LINK } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  hostURL = API_URL_LINK;

  constructor(
    private http: HttpClient,
  ) {
  }

  get(url): Observable<any> {
    return this.http.get(API_URL_LINK + url).pipe(take(1));
  }

  post(url, data): Observable<any> {
    return this.http.post((API_URL_LINK + url), data).pipe(
      take(1),
      catchError((httpError) => throwError(httpError.error))
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

}
