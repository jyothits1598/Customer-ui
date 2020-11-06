import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationModule } from '../location/location-selector.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngb-modal';
import { SearchModule } from '../search/search.module';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    LocationModule,
    ModalModule,
    SearchModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
