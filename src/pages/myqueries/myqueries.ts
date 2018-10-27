import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadqueriesProvider } from '../../providers/loadqueries/loadqueries';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadqueriesProvider: LoadqueriesProvider, private alertCtrl: AlertServiceProvider, private utility: UtilityProvider) {
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
        this.alertCtrl.showAlert('Oops', response.extras.msg);
      }
    }, error => {
      console.log(error);
      this.alertCtrl.showAlert('Oops', 'Unable to login now, please try again...');
    });
  }

}
