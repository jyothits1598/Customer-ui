import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { URL_FacebookSignup, URL_SendCode, URL_Signup } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Injectable()
export class SignupService {

  constructor(private restApiService: RestApiService) { }

  sendCode(identity: string, type: 'email' | 'mobile' = 'email') {
    return this.restApiService.post(URL_SendCode, {
      'email': identity
    });
  }

  emailSignup(data: any) {
    return this.restApiService.post(URL_Signup, data);
  }

  facebookSignup(data: { email: string, firstName: string, lastName: string, token: string }) {
    console.log('calling facebook sign up', data);
    let d: any = {};
    d.first_name = data.firstName;
    d.last_name = data.lastName;
    d.email = data.email;
    d.facebook_token = data.token;

    return this.restApiService.post(URL_FacebookSignup, d);
  }
}
