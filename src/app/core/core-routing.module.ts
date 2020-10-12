import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreDetailsComponent } from '../modules/stores/components/store-details/store-details.component';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  { path: 'store-details', component: StoreDetailsComponent},
  {
    path: '',
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
