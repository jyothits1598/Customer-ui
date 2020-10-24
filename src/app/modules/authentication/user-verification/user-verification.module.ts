import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserVerificationComponent } from './pages/user-verification/user-verification.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserVerificationComponent,
  }
]

@NgModule({
  declarations: [UserVerificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserVerificationModule { }
