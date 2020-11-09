import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NavbarModule } from '../modules/navbar/navbar.module';
import { HomeModule } from '../modules/home/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptors/http-header';
import { SnackBarComponent } from './components/snack-bar/snack-bar/snack-bar.component';
import { SnackBarContainerComponent } from './components/snack-bar/snack-bar-container/snack-bar-container.component';
import { LoginPromptComponent } from './components/login-prompt/login-prompt.component';
import { HttpAuthErrorInterceptor } from './interceptors/http-auth-error.interceptor';
import { SampleComponent } from './components/sample/sample.component';


@NgModule({
  declarations: [CoreComponent, LayoutComponent, SnackBarComponent, SnackBarContainerComponent, LoginPromptComponent, SampleComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NavbarModule,
    HomeModule,
  ],
  exports: [CoreComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthErrorInterceptor,
      multi: true
    },
    {
      provide: Window,
      useValue: window
    },
  ]
})
export class CoreModule { }


