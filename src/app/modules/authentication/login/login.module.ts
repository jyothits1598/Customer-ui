import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordHelperModule } from '../password-helper/password-helper.module';
import { SocialSignInComponent } from './components/social-sign-in/social-sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  }
]

@NgModule({
  declarations: [LoginComponent, SocialSignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PasswordHelperModule
  ]
})
export class LoginModule { }
