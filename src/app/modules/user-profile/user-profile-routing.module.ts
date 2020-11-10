import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserBasicDetailsComponent } from './components/user-basic-details/user-basic-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserBasicDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }