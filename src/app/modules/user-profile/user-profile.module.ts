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
import { ChangePasswordComponent } from './pages/user-security/change-password/change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PasswordHelperModule } from '../authentication/password-helper/password-helper.module';
import { ChangeEmailComponent } from './pages/user-security/change-email/change-email.component';
import { ChangeMobileComponent } from './pages/user-security/change-mobile/change-mobile.component';
import { PasswordConfirmationGuard } from './guards/password-confirmation.guard';
import { CurrentPasswordComponent } from './pages/user-security/current-password/current-password.component';
import { VerificationCodeModule } from '../authentication/verification-code/verification-code.module';
import { TelInputModule } from '../tel-input/tel-input.module';
import { NavbarModifierModule } from '../navbar-modifier/navbar-modifier.module';

@NgModule({
  declarations: [
    UserBasicDetailsComponent,
    BasicProfileComponent,
    UserSettingsComponent,
    UserSecurityComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    UserProfileImageComponent,
    ChangeEmailComponent,
    ChangeMobileComponent,
    CurrentPasswordComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    PasswordHelperModule,
    VerificationCodeModule,
    TelInputModule,
    NavbarModifierModule
  ],
  providers: [PasswordConfirmationGuard]
})
export class UserProfileModule { }
