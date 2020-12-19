import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guards/is-authenticated.guard';
import { BasicProfileComponent } from './pages/basic-profile/basic-profile.component';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { UserSecurityComponent } from './pages/user-security/user-security.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: BasicProfileComponent
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
    component: UserSecurityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }