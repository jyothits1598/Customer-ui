import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NavbarModule } from '../modules/navbar/navbar.module';
import { HomeModule } from '../modules/home/home.module';


@NgModule({
  declarations: [CoreComponent, LayoutComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NavbarModule,
    HomeModule
  ],
  exports: [CoreComponent]
})
export class CoreModule { }
