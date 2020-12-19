import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { BasicProfileComponent } from './pages/basic-profile/basic-profile.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UserSecurityComponent } from './pages/user-security/user-security.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserProfileImageComponent } from './pages/user-profile/user-profile-image/user-profile-image.component';
import { MobileEmailComponent } from './pages/user-security/mobile-email/mobile-email.component';
import { ChangePasswordComponent } from './pages/user-security/change-password/change-password.component';

@NgModule({
    declarations: [UserBasicDetailsComponent, BasicProfileComponent, UserSettingsComponent, UserSecurityComponent, MobileEmailComponent, ChangePasswordComponent, UserProfileComponent, UserProfileImageComponent],
    imports: [
      CommonModule,
      UserProfileRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      FileUploadModule
    ]
  })
export class UserProfileModule { }
