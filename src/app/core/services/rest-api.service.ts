import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL_LINK } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  hostURL = API_URL_LINK;

  constructor(
    private http: HttpClient,
  ) { }

  get(url): Observable<any> {
    return this.http.get(API_URL_LINK + url);
  }

}
