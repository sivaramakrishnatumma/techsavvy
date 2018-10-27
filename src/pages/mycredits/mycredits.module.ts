import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycreditsPage } from './mycredits';

@NgModule({
  declarations: [
    MycreditsPage,
  ],
  imports: [
    IonicPageModule.forChild(MycreditsPage),
  ],
})
export class MycreditsPageModule {}
