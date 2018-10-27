import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatWindowPage } from './chat-window';

@NgModule({
  declarations: [
    ChatWindowPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatWindowPage),
  ],
})
export class ChatWindowPageModule {}
