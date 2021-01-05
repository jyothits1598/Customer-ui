import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationCodeModule } from '../verification-code/verification-code.module';
import { ResetSuccessComponent } from './pages/reset-success/reset-success.component';
import { TelInputModule } from '../../tel-input/tel-input.module';
import { UseridVerificationComponent } from './components/userid-verification/userid-verification.component';
import { EnterPasswordComponent } from './components/userid-verification/enter-password/enter-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },
  {
    path: 'success',
    component: ResetSuccessComponent,
  }
]

@NgModule({
  declarations: [ForgotPasswordComponent, ResetSuccessComponent, UseridVerificationComponent, EnterPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    VerificationCodeModule,
    TelInputModule
  ]
})
export class ForgotPasswordModule { }
