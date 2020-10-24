import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordHelperModule } from '../password-helper/password-helper.module';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  }
]

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PasswordHelperModule
  ]
})
export class SignupModule { }
