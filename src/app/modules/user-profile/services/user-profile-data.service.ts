import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_changeEmailMobile, URL_ProfileChangePassword, URL_ProfileData, URL_ProfileDataSettings, URL_ProfileDataUpdate, URL_ProfileImageUpload } from 'src/api/profile';
import { BackendResponse } from 'src/app/core/model/backend-resp';
import { User, userDTO, UserToBackend } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { UserProfile } from '../model/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  constructor(private restApiService: RestApiService, private authService: AuthService) { }

  updateProfile(data: { firstName: string, lastName: string, profileImage?: string }): Observable<BackendResponse<userDTO>> {
    let d: any = {}
    d.first_name = data.firstName;
    d.last_name = data.lastName;
    if (data.profileImage) d.picture = data.profileImage;
    return this.restApiService.patch(URL_ProfileDataUpdate, d);
  }

  uplaodProfileImage(file: File): Observable<{ fileName: string, url: string }> {
    let formData = new FormData();
    formData.append('file', file);
    return this.restApiService.post<{ fileName: string, url: string }>(URL_ProfileImageUpload, formData).pipe(map((resp) => resp.data))
  }

  getProfileData(): Observable<User> {
    // return this.authService.loggedUser$;
    return this.restApiService.get<userDTO>(URL_ProfileData).pipe(map(
      (d) => {
        return <User>{
          id: d.id,
          firstName: d.first_name,
          lastName: d.last_name,
          email: d.email,
          phoneNumber: d.mobile_number,
          radius: d.radius,
          pictureURL: d.picture,
        }
      }
    ))
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.restApiService.patch(URL_changeEmailMobile,
      {
        current_password: currentPassword,
        new_password: newPassword,
        type: 'password',
      });
  }

  changeEmail(email: string, code: string): Observable<BackendResponse<userDTO>> {
    return this.restApiService.patch(URL_changeEmailMobile, {
      type: 'email',
      email: email,
      email_token: code
    })
  };

  changeCustomRadius(type: 'custom' | 'suggested', radius?: number): Observable<BackendResponse<userDTO>> {
    let data = { search_radius_type: type, radius: radius }
    return this.restApiService.patch(URL_ProfileDataSettings, data);
  }

  changeMobile(phoneNumber: string, code: string): Observable<BackendResponse<userDTO>> {
    return this.restApiService.patch(URL_changeEmailMobile, {
      type: 'mobile',
      mobile_number: phoneNumber,
      mobile_token: code
    })
  }
}
