import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AsyncFileValidators } from 'src/app/modules/file-upload/file-validators';
import { UserProfile } from '../../../model/UserProfile';
import { UserProfileDataService } from '../../../services/user-profile-data.service';

@Component({
  selector: 'user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.scss']
})
export class UserProfileImageComponent implements OnInit {
  @Input() profileImageUrl: string;
  @Input() editMode: boolean;
  @Output() urlChange = new EventEmitter<string | null>();
  uploading: boolean = false;
  errorMessage;
  validFileFormats = ['.jpeg', '.jpg', '.png', '.gif'];
  asyncValidators = [AsyncFileValidators.imageSizeValidator(500, 500, 500, 500)];
  profileData: UserProfile;
  constructor(private userProfData: UserProfileDataService) { }

  handleFileUpload(file: File) {
    this.uploading = true;
    this.userProfData.uplaodProfileImage(file).pipe(finalize(() => { this.uploading = false })).subscribe(
      (resp) => {
        this.urlChange.emit(resp)
      },
      (resp) => {
        this.handleError(resp)
      }
    )
  }

  handleError(errorResp) {
    if (errorResp.error.profile_image) this.errorMessage = errorResp.error.profile_image[0];
  }

  handleFileError() {
    console.log('error during upload of image');
  }

  ngOnInit(): void {
    this.userProfData.getProfileData().subscribe(prof => { this.profileData = prof;});
  }

}
