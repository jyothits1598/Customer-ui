import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { URL_ConfirmPassword, URL_FacebookLogin, URL_login } from 'src/api/authentication';
import { SocialAuthHelperService } from 'src/app/modules/authentication/services/social-auth-helper.service';
import { BackendResponse } from '../model/backend-resp';
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

  get loggedUser(): User {
    return this._loggedUser.value;
  }

  get loggedUser$(): Observable<User> {
    return this._loggedUser.asObservable();
  }

  setCustomRadius(radius: number) {
    let user = { ...this.loggedUser };
    user.radius = radius;
    this.storeageService.store('user', user);
    this._loggedUser.next(user);
  }

  setPhoneNumber(phone: string) {
    let user = { ...this.loggedUser };
    user.phoneNumber = phone;
    this.storeageService.store('user', user);
    this._loggedUser.next(user);
  }

  setEmail(email: string) {
    let user = { ...this.loggedUser };
    user.email = email;
    this.storeageService.store('user', user);
    this._loggedUser.next(user);
  }

  updateUser(u: User) {
    this.storeageService.store('user', u)
    this._loggedUser.next(u);
  }

  isLoggedIn$() {
    return this._accessToken.asObservable().pipe(map(token => !!token))
  }

  get isLoggedIn(): boolean {
    return !!this._accessToken.value;
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

  login(data: { email?: string, mobile?: string, type: 'email' | 'mobile', password: string }) {
    let reqData: any = {
      type: (data.type === 'email') ? 'email' : 'mobile',
      password: data.password
    };
    if (data.type === 'email') reqData.email = data.email;
    else reqData.mobile_number = data.mobile;

    return this.restApiService.post(URL_login, reqData).pipe(tap(
      (resp) => this.handleLoginResp(resp)
    ))
  }

  confirmPassword(password: string) {
    return this.restApiService.post(URL_ConfirmPassword, {
      current_password: password
    });
  }

  facebookSignin(data: { email: string, firstName: string, lastName: string, token: string }) {
    console.log('calling facebook sign in', data);
    let d: any = {};
    d.first_name = data.firstName;
    d.last_name = data.lastName;
    d.email = data.email;
    d.facebook_token = data.token;
    return this.restApiService.post(URL_FacebookLogin, d).pipe(tap(
      (resp) => this.handleLoginResp(resp)
    ))
  }

  socialSignIn(user: { email: string, token: string }, type: 'google' | 'facebook') {
    let data = {
      email: user.email,
      token: user.token,
      type: type
    }
    return this.restApiService.post('api/v1/social-auth', data).pipe(tap(
      (resp) => this.handleLoginResp(resp)
    ))
  }

  logout() {
    if (this.loggedUser) {
      this._accessToken.next(null);
      this._loggedUser.next(null);
    }

    this.storeageService.remove('authToken')
    this.storeageService.remove('user')
    this.storeageService.remove('authTokenExpiry')
  }

  handleLoginResp(r: BackendResponse<any>) {
    let user = ReadUserDetails(r.data.user);
    let token = 'Bearer ' + r.data.access_token;
    this._accessToken.next(token);
    this._loggedUser.next(user);

    //save into storage
    this.storeageService.store('authToken', token);
    let expDt = new Date();
    expDt.setSeconds(r.data.expires_in);
    this.storeageService.store('authTokenExpiry', expDt);
    this.storeageService.store('user', user);
  }

}
