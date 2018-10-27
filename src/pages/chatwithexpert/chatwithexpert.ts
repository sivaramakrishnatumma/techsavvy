import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { UtilityProvider } from './../../providers/utility/utility';
import { UsersServiceProvider } from './../../providers/users-service/users-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChatwithexpertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatwithexpert',
  templateUrl: 'chatwithexpert.html',
})
export class ChatwithexpertPage {
  private user: any;
  private users: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private usersService: UsersServiceProvider, private alertCtrl: AlertServiceProvider, private utility: UtilityProvider, private storage: LocalStorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatwithexpertPage');
    this.storage.getItem('user').then(user => {
      this.user = user;
      this.getUsers();
    });
  }

  private getUsers() {
    this.usersService.getAllUsers().then((response: any)=> {
      if (response.success) {
        this.users = response.extras.users.filter(item => item.empId !== this.user.empId);
      }
      else {
        this.alertCtrl.showAlert('Oops', response.extras.msg);
      }
    }, err => {
      this.alertCtrl.showAlert('Oops', 'Unable to connect with the server, please try later...');
    });
  }
}
