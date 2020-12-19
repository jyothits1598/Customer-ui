import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AsyncFileValidators } from 'src/app/modules/file-upload/file-validators';
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

  validFileFormats = ['.jpeg', '.jpg', '.png', '.gif'];
  asyncValidators = [AsyncFileValidators.imageSizeValidator(500, 500, 500, 500)];

  constructor(private userProfData: UserProfileDataService) { }

  handleFileUpload(file: File) {
    this.uploading = true;
    this.userProfData.uplaodProfileImage(file).pipe(finalize(() => { this.uploading = false })).subscribe(
      resp => this.urlChange.emit(resp)
    )
  }

  handleFileError() {
    console.log('error during upload of image');
  }

  ngOnInit(): void {
  }

}
