import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreItemDetailComponent } from './pages/store-item-detail/store-item-detail.component';
import { StoreItemModifierComponent } from './components/store-item-modifier/store-item-modifier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemModiferSelectorRadioComponent } from './components/item-modifer-selector-radio/item-modifer-selector-radio.component';
import { ModifierSelectionStatusComponent } from './components/modifier-selection-status/modifier-selection-status.component';
import { ItemCountComponent } from './components/item-count/item-count.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShareModule } from '../share/share.module';
import { StoreHeartModule } from '../store-heart/store-heart.module';



@NgModule({
  declarations: [StoreItemDetailComponent, StoreItemModifierComponent, ItemModiferSelectorRadioComponent, ModifierSelectionStatusComponent, ItemCountComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    StoreHeartModule
  ],
  exports: [StoreItemDetailComponent]
})
export class StoreItemDetailModule { }
