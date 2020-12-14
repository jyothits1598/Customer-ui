import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { CustomValidators } from 'src/app/helpers/validators';
import { FileValidators } from 'src/app/modules/file-upload/file-validators';
import { UserProfileDataService } from '../../services/user-profile-data.service';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.scss']
})
export class BasicProfileComponent implements OnInit {

  constructor(private snackBar: SnackBarService,
    private router: Router,
    private userProfileDataService: UserProfileDataService,
    private route: ActivatedRoute) { }
  backendErrorMessage: string;
  validFileFormats = ['.jpeg', '.jpg', '.png', '.gif'];
  fileValidators = [FileValidators.typeValidator(this.validFileFormats)];

  imageLoading: boolean = false;
  saving: boolean = false;

  ngOnInit(): void {
    
  }

  profileForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, CustomValidators.required('First name is required.')),
    lastName: new FormControl(null, CustomValidators.required('Last name is required.')),
    profileImage: new FormControl()
  })

  handleSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.saving = true;
    this.userProfileDataService.updateProfile(this.profileForm.value).pipe(finalize(() => this.saving = false)).subscribe(
      () => this.router.navigate(['/']),
      (resp) => this.handleSubmitErrors(resp)
    );
  }

  handleSubmitErrors(data: any) {
    if (data.error?.profile_image) {
      this.backendErrorMessage = data.error.profile_image[0];
      this.profileForm.setErrors({ backendError: true })
    }
  }

  handleFileUpload(file: File) {
    this.imageLoading = true;
    this.userProfileDataService.uplaodProfileImage(file).pipe(finalize(() => this.imageLoading = false)).subscribe(
      fileUrl => this.profileForm.controls.profileImage.setValue(fileUrl)
    )
  }

  handleFileError(error: any) {
    this.snackBar.error(error);
  }
}
