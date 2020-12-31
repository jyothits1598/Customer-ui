import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { URL_ConfirmPassword, URL_FacebookLogin, URL_login } from 'src/api/authentication';
import { SocialAuthHelperService } from 'src/app/modules/authentication/services/social-auth-helper.service';
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
    user.customRadius = radius;
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
      type: (data.type === 'email') ? 'email' : 'mobile_number',
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
      password: password
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
      social_auth_token: user.token,
      social_login_type: type
    }
    return this.restApiService.post('api/customer/v1/social-auth', data).pipe(tap(
      (resp) => this.handleLoginResp(resp)
    ))

  }

  logout() {
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
