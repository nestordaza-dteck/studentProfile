import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateProfileComponent,
    ViewProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }