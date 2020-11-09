import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotSignedInGuard } from './guards/not-signed-in.guard';
import { AuthParentComponent } from './pages/auth-parent/auth-parent.component';


const routes: Routes = [
  {
    path: '',
    component: AuthParentComponent,
    canActivate: [NotSignedInGuard],
    children: [
      {
        path: 'forgot-password', loadChildren: () => import('src/app/modules/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      {
        path: 'reset-password', loadChildren: () => import('src/app/modules/authentication/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'signup', loadChildren: () => import('src/app/modules/authentication/signup/signup.module').then(m => m.SignupModule)
      },
      {
        path: 'signin', loadChildren: () => import('src/app/modules/authentication/login/login.module').then(m => m.LoginModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
