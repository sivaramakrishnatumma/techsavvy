import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UtilityProvider } from '../../providers/utility/utility';
import { LoadqueriesProvider } from '../../providers/loadqueries/loadqueries';

/**
 * Generated class for the AnsweraqueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answeraquery',
  templateUrl: 'answeraquery.html',
})
export class AnsweraqueryPage {
  private user: any;
  private queries: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadqueriesProvider: LoadqueriesProvider, private utility: UtilityProvider, private storage: LocalStorageProvider, private alertCtrl: AlertServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnsweraqueryPage');
    this.storage.getItem('user').then(user => {
      this.user = user;
      this.loadQueries();
    });
  }

  loadQueries() {
    this.loadqueriesProvider.getQueries().then((response: any) => {
      console.log(response);
      if (response.success) {
        this.queries = response.extras.queries.filter(item => item.postBy !== this.user.empId);
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
