import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';
import { UserSettingComponent } from './user-setting/user-setting.component';


@NgModule({
  declarations: [UserBasicDetailsComponent, UserSettingComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
