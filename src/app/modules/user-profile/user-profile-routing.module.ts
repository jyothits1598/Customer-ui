import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from 'src/app/core/guards/is-authenticated.guard';
import { BasicProfileComponent } from './components/basic-profile/basic-profile.component';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard],
    component: BasicProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }