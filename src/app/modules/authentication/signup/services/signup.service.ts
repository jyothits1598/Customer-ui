import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { URL_SendCode, URL_Signup } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
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
}
