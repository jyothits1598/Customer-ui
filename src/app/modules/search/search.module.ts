import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { StoresModule } from '../stores/stores.module';
import { StoreSearchInlineComponent } from './components/store-search-inline/store-search-inline.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarModifierModule } from '../navbar-modifier/navbar-modifier.module';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
];

@NgModule({
  declarations: [SearchComponent, StoreSearchInlineComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoresModule,
    NavbarModifierModule,
  ],
  exports: [StoreSearchInlineComponent],
  // providers: [SearchDataService]
})
export class SearchModule {}
