import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_LINK } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  hostURL = API_URL_LINK;

  constructor(
    private http: HttpClient,
  ) { }



}
