import { Injectable } from '@angular/core';
import { URL_ConfirmUser, URL_newPassword } from 'src/api/authentication';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private restApiService: RestApiService) { }

  verfiyUser(data: { type: 'mobile' | 'email', value: string, code: string }) {
    let req: any = {
      verificationCode: data.code
    }
    if (data.type === 'mobile') {
      req.mobile_number = data.value;
      req.type = 'mobile_number'
    }
    else {
      req.email = data.value;
      req.type = 'email'
    }

    return this.restApiService.post(URL_ConfirmUser, req);
  }

  setPassword(data: { type: 'mobile' | 'email', value: string, code: string, password: string }){
    console.log('this is set password',data)
    let req: any = {
      verificationCode: data.code,
      new_password: data.password 
    }
    if (data.type === 'mobile') {
      req.mobile_number = data.value;
      req.type = 'mobile_number'
    }
    else {
      req.email = data.value;
      req.type = 'email'
    }

    return this.restApiService.patch(URL_newPassword, req)

  }
}
