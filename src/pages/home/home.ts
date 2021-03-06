import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { UtilityProvider } from '../../providers/utility/utility';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  private empId: string;
  private password: string;

  constructor(public navCtrl: NavController, private loginService: LoginServiceProvider, private alertCtrl: AlertServiceProvider, private utility: UtilityProvider) {

  }

  login() {
    let user = {
      'empId': this.empId,
      'password': this.password
    }
    this.loginService.checkLogin(user).then((response: any) => {
      if (response.success) {
        this.utility.putUserData(response.extras.userProfile);
        this.navCtrl.setRoot('SearchPage');
      }
      else {
        this.alertCtrl.showAlert('Oops...', response.extras.msg);
      }
    }, error => {
      console.log(error);
      this.alertCtrl.showAlert('Oops', 'Unable to login now, please try again...');
    });

    //this.navCtrl.push(DashboardPage);
  }
}
