import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationSelectorModule } from '../location-selector/location-selector.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    LocationSelectorModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
