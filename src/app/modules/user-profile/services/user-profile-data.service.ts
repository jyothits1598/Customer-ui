import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { URL_ProfileData, URL_ProfileImageUpload } from 'src/api/profile';
import { RestApiService } from 'src/app/core/services/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataService {

  constructor(private restApiService: RestApiService) { }

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