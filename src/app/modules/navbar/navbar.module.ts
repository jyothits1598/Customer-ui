import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationModule } from '../location/location-selector.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    LocationModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
