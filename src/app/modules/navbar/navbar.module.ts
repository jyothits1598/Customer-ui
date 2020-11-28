import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationModule } from '../location/location-selector.module';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngb-modal';
import { SearchModule } from '../search/search.module';
import { SignedInOptionsComponent } from './components/signed-in-options/signed-in-options.component';
import { NavbarIconsComponent } from './components/navbar-icons/navbar-icons.component';


@NgModule({
  declarations: [NavbarComponent, SignedInOptionsComponent, NavbarIconsComponent],
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
