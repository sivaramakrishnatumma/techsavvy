import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DashboardPage } from '../dashboard/dashboard';
import { UtilityProvider } from '../../providers/utility/utility';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
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
        this.navCtrl.push(DashboardPage);
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
