import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './pages/search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { StoresModule } from '../stores/stores.module';
import { StoreSearchComponent } from './components/store-search/store-search.component';
import { IncrementalSearchModule } from '../incremental-search/incremental-search.module';
import { StoreSearchInlineComponent } from './components/store-search-inline/store-search-inline.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { SearchHistoryComponent } from './components/search-panel/search-history/search-history.component';
import { SearchDataService } from './services/search-data.service';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  }
]


@NgModule({
  declarations: [SearchComponent, StoreSearchComponent, StoreSearchInlineComponent, SearchPanelComponent, SearchHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoresModule,
    IncrementalSearchModule
  ],
  exports: [StoreSearchInlineComponent],
  providers: [SearchDataService]
})
export class SearchModule { }
