import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { URL_FacebookSignup, URL_SendCode, URL_Signup } from 'src/api/authentication';
import { URL_ProfileData, URL_ProfileImageUpload } from 'src/api/profile';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Injectable()
export class SignupService {

  constructor(private restApiService: RestApiService) { }

  sendCode(value: string, type: 'email' | 'mobile' = 'email') {
    let data: any = {
      type: type === 'email' ? 'email' : 'mobile_number'
    };
    if (type === 'email') data.email = value
    else data.mobile_number = value;

    return this.restApiService.post(URL_SendCode, data);
  }

  emailSignup(data: { email?: string, mobile?: string, password: string, type: 'mobile' | 'email', verificationCode: string }) {
    let d: any = {}

    if (data.type === 'mobile') d.mobile_number = data.mobile;
    else d.email = data.email;

    d.type = data.type === 'mobile' ? 'mobile_number' : 'email';

    d.password = data.password;
    d.verificationCode = data.verificationCode

    return this.restApiService.post(URL_Signup, d);
  }

  updateProfile(data: { firstName: string, lastName: string, profileImage?: string }) {
    let d: any = {}
    d.first_name = data.firstName;
    d.last_name = data.lastName;
    if (data.profileImage) d.profile_image = data.profileImage;

    return this.restApiService.put(
      URL_ProfileData, d
    );
  }

  uplaodProfileImage(file: File) {

    let formData = new FormData();
    formData.append('profile_image', file);
    return this.restApiService.post(URL_ProfileImageUpload, formData).pipe(map((resp) => resp.data))
  }
}
