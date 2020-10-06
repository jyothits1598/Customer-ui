import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';



@NgModule({
  declarations: [RestaurantListComponent, RestaurantCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RestaurantListComponent
  ]
})
export class RestaurantsModule { }
