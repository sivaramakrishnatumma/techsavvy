import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';

import { LoginServiceProvider } from '../providers/login-service/login-service';
import { UtilityProvider } from '../providers/utility/utility';
import { LoadqueriesProvider } from '../providers/loadqueries/loadqueries';
import { PostQueryServiceProvider } from '../providers/post-query-service/post-query-service';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    UtilityProvider,
    LoadqueriesProvider,
    LoadqueriesProvider,
    PostQueryServiceProvider
  ]
})
export class AppModule {}
