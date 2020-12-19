import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guards/is-authenticated.guard';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UserSecurityComponent } from './pages/user-security/user-security.component';
import { CurrentPasswordComponent } from './pages/user-security/current-password/current-password.component';
import { MobileEmailComponent } from './pages/user-security/mobile-email/mobile-email.component';
import { ChangePasswordComponent } from './pages/user-security/change-password/change-password.component';

const routes: 
Routes = [
  {
    path: '',
    component: UserBasicDetailsComponent,
  },
  {
    path: 'settings',
    component: UserSettingsComponent
  },
  {
    path: 'security',
    component: UserSecurityComponent,
  },
  {
    path: 'current-password',
    component: CurrentPasswordComponent
  },
  {
    path: 'update-details',
    component: MobileEmailComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }