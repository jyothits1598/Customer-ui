import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ReadUserDetails, User } from 'src/app/core/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { AsyncFileValidators, FileValidators } from 'src/app/modules/file-upload/file-validators';
import { UserProfile } from '../../model/UserProfile';
import { UserProfileDataService } from '../../services/user-profile-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  isLoading = true;
  profileData: User;
  editMode: boolean = false;
  errorMessage;
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, CustomValidators.required('First name is required.')),
    lastName: new FormControl(null, CustomValidators.required('Last name is required.')),
    pictureURL: new FormControl(),
  })
  saving: boolean = false;

  constructor(private userProfData: UserProfileDataService,
    private auth: AuthService,
    private sb: SnackBarService) { }

  ngOnInit(): void {
    this.userProfData.getProfileData().subscribe(prof => { this.profileData = prof; this.profileForm.patchValue(prof) });
  }

  toggleEdit() {
    if (!this.editMode) this.profileForm.patchValue(this.profileData);
    // console.log(this.profileForm.value);
    this.editMode = !this.editMode;
  }

  handleFileChange(imgUrl: string) {
    this.profileForm.controls.pictureURL.setValue(imgUrl);
    this.profileForm.controls.pictureURL.markAsDirty();
  }

  saveChanges() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.saving = false;
    }
    if (this.profileForm.valid) {
      this.saving = true;
      this.userProfData.updateProfile(this.profileForm.value).pipe(finalize(() => this.saving = false)).subscribe(
        (resp) => {
          this.profileData = ReadUserDetails(resp.data);
          this.profileForm.reset();
          this.editMode = false;
          this.auth.updateUser(this.profileData);
          this.sb.success(resp.message)
        },
        (resp) => { this.handleError(resp) }
      );
    }
  }

  handleError(errorResp) {
    if (errorResp.error.first_name) this.errorMessage = errorResp.error.first_name[0];
    if (errorResp.error.last_name) this.errorMessage = errorResp.error.last_name[0];
  }
}
