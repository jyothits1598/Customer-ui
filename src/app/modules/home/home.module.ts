import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { StoresModule } from '../stores/stores.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    StoresModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
