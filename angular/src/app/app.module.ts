import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {CoreModule} from './core/core.module';
import {WelcomeModule} from './welcome/welcome.module';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {SharedModule} from './shared/shared.module';

import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    CoreModule.forRoot(),
    AuthModule.forRoot(),
    WelcomeModule.forRoot(),
    SharedModule.forRoot(),

    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
