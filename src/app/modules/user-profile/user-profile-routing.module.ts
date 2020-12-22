import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guards/is-authenticated.guard';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UserSecurityComponent } from './pages/user-security/user-security.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CurrentPasswordComponent } from './pages/user-security/current-password/current-password.component';
import { MobileEmailComponent } from './pages/user-security/mobile-email/mobile-email.component';
import { ChangePasswordComponent } from './pages/user-security/change-password/change-password.component';
import { ChangeEmailComponent } from './pages/user-security/change-email/change-email.component';
import { PasswordConfirmationGuard } from './guards/password-confirmation.guard';
import { ChangeMobileComponent } from './pages/user-security/change-mobile/change-mobile.component';

const routes:
  Routes = [
    {
      path: '',
      component: UserBasicDetailsComponent,
    },
    {
      path: 'basic',
      component: UserProfileComponent
    },
    {
      path: 'settings',
      component: UserSettingsComponent
    },
    {
      path: 'security',
      children: [
        { path: '', component: UserSecurityComponent },
        {
          path: 'current-password',
          component: CurrentPasswordComponent
        },
        {
          path: 'change-password',
          component: ChangePasswordComponent
        },
        {
          path: 'change-email',
          // canActivate: [PasswordConfirmationGuard],
          component: ChangeEmailComponent
        },
        {
          path: 'change-mobile',
          // canActivate: [PasswordConfirmationGuard],
          component: ChangeMobileComponent
        }
      ]

    },
    {
      path: 'update-details',
      component: MobileEmailComponent
    },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }