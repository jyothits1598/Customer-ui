import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';


@NgModule({
  declarations: [UserBasicDetailsComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
