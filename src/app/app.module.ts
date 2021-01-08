import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyPolicyComponent } from 'src/app/modules/privacy-policy/privacy-policy.component';
import { TermsServiceComponent } from 'src/app/modules/terms-service/terms-service.component';


@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyComponent,
    TermsServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
