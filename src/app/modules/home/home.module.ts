import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantsModule } from '../restaurants/restaurants.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RestaurantsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
