import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyqueriesPage } from './myqueries';

@NgModule({
  declarations: [
    MyqueriesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyqueriesPage),
  ],
})
export class MyqueriesPageModule {}
