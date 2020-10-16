import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NavbarModule } from '../modules/navbar/navbar.module';
import { HomeModule } from '../modules/home/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpHeaderInterceptor } from './interceptors/http-header';


@NgModule({
  declarations: [CoreComponent, LayoutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NavbarModule,
    HomeModule
  ],
  exports: [CoreComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true
    },
    {
      provide: Window,
      useValue: window
    }
  ]
})
export class CoreModule { }


