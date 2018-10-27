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

  constructor(public navCtrl: NavController, private loginService: LoginServiceProvider, private alertCtrl: AlertController, private utility: UtilityProvider) {

  }

  login() {
    let user = {
      'empId': this.empId,
      'password': this.password
    }
    this.loginService.checkLogin(user).then((response: any) => {
      console.log(response);
      if (response.success) {
        this.utility.putUserData(response.extras.userProfile);
        this.navCtrl.push('DashboardPage');
      }
      else {
        this.showAlert('Oops', response.extras.msg);
      }
    }, error => {
      console.log(error);
      this.showAlert('Oops', 'Unable to login now, please try again...');
    });

    //this.navCtrl.push(DashboardPage);
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
