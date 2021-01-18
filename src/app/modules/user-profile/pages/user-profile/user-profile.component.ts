import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';
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
  profileData: UserProfile;
  editMode: boolean = false;
  errorMessage;
  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, CustomValidators.required('First name is required.')),
    lastName: new FormControl(null, CustomValidators.required('Last name is required.')),
    profileImage: new FormControl()
  })
  saving: boolean = false;

  constructor(private userProfData: UserProfileDataService) { }

  ngOnInit(): void {
    this.userProfData.getProfileData().subscribe(prof => { this.profileData = prof; this.profileForm.patchValue(prof) });
  }

  toggleEdit() {
    if (!this.editMode) this.profileForm.patchValue(this.profileData);
    // console.log(this.profileForm.value);
    this.editMode = !this.editMode;
  }

  handleFileChange(imgUrl: string) {
    this.profileForm.controls.profileImage.setValue(imgUrl);
    this.profileForm.controls.profileImage.markAsDirty();
  }

  saveChanges() {
    if (this.profileForm.invalid) { 
      this.profileForm.markAllAsTouched();
      this.saving = false;
    }
    if (this.profileForm.valid) { this.saving = true; 
    this.userProfData.updateProfile(this.profileForm.value).pipe(finalize(() => this.saving = false)).subscribe(
      (resp) => { 
        this.profileData = this.profileForm.value; 
        this.profileForm.reset(); 
        this.editMode = false; 
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
