import { ChatwithexpertPageModule } from './../pages/chatwithexpert/chatwithexpert.module';
import { SearchPageModule } from './../pages/search/search.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { UtilityProvider } from '../providers/utility/utility';
import { FormsModule } from '@angular/forms';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { PostaqueryPageModule } from '../pages/postaquery/postaquery.module';
import { AnsweraqueryPageModule } from '../pages/answeraquery/answeraquery.module';
import { MyqueriesPageModule } from '../pages/myqueries/myqueries.module';
import { MycreditsPageModule } from '../pages/mycredits/mycredits.module';
import { LoadqueriesProvider } from '../providers/loadqueries/loadqueries';
import { PostQueryServiceProvider } from '../providers/post-query-service/post-query-service';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    FormsModule,
    DashboardPageModule,
    PostaqueryPageModule,
    AnsweraqueryPageModule,
    SearchPageModule,
    MyqueriesPageModule,
    ChatwithexpertPageModule,
    MycreditsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
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
