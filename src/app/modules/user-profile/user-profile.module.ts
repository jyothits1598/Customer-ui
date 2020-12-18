import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { BasicProfileComponent } from './components/basic-profile/basic-profile.component';


@NgModule({
  declarations: [UserBasicDetailsComponent, BasicProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ]
})
export class UserProfileModule { }
