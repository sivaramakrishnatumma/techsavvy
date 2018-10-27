import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadqueriesProvider } from '../../providers/loadqueries/loadqueries';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UtilityProvider } from '../../providers/utility/utility';

/**
 * Generated class for the MyqueriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myqueries',
  templateUrl: 'myqueries.html',
})
export class MyqueriesPage {
  private queries: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadqueriesProvider: LoadqueriesProvider, private alertCtrl: AlertController, private utility: UtilityProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnsweraqueryPage');
    this.loadQueries();
  }

  loadQueries() {
    this.loadqueriesProvider.getQueries().then((response: any) => {
      console.log(response);
      if (response.success) {
        this.queries = response.extras.queries.filter(item => item.postBy === this.utility.getUserData().empId);
      }
      else {
        this.showAlert('Oops', response.extras.msg);
      }
    }, error => {
      console.log(error);
      this.showAlert('Oops', 'Unable to login now, please try again...');
    });
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
