import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { URL_login } from 'src/api/authentication';
import { ReadUserDetails, User } from '../model/user';
import { RestApiService } from './rest-api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _loggedUser: BehaviorSubject<User>;
  _accessToken: BehaviorSubject<string>;

  constructor(private restApiService: RestApiService,
    private storeageService: StorageService) {
    this.initializeAuth();
  }

  get token() {
    return this._accessToken.value;
  }

  isLoggedIn() {
    return this._accessToken.asObservable().pipe(map(token => !!token))
  }

  initializeAuth() {
    let expDateStr = this.storeageService.get('authTokenExpiry');
    let user = this.storeageService.get('user');
    let token = this.storeageService.get('authToken');

    if (expDateStr && user && token) {
      let d = new Date(expDateStr);

      //check if the token has expired
      if ((Date.now() < d.getTime())) {
        this._loggedUser = new BehaviorSubject<User>(user);
        this._accessToken = new BehaviorSubject<string>(token);
        return;
      }

    }

    this._loggedUser = new BehaviorSubject<User>(null);
    this._accessToken = new BehaviorSubject<string>(null);

    this.storeageService.remove('authToken')
    this.storeageService.remove('user')
    this.storeageService.remove('authTokenExpiry')
  }

  login(data: { email: string, password: string }) {
    return this.restApiService.post(URL_login, data).pipe(tap(
      (resp) => this.handleLoginResp(resp)
    ))
  }

  logout(){
    this._accessToken.next(null);
    this._loggedUser.next(null);

    this.storeageService.remove('authToken')
    this.storeageService.remove('user')
    this.storeageService.remove('authTokenExpiry')
  }

  handleLoginResp(data: any) {
    let user = ReadUserDetails(data.user_details);
    let token = 'Bearer ' + data.access_token;
    this._loggedUser.next(user);
    this._accessToken.next(token);

    //save into storage
    this.storeageService.store('authToken', token);
    this.storeageService.store('authTokenExpiry', data.expires_at);
    this.storeageService.store('user', user);
  }

}
