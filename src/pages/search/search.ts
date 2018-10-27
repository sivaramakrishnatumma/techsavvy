import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadqueriesProvider } from '../../providers/loadqueries/loadqueries';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  private queries: any = [];
  private allQueries: any = [];
  private searchText: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadqueriesProvider: LoadqueriesProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.loadQueries();
  }

  loadQueries() {
    this.loadqueriesProvider.getQueries().then((response: any) => {
      console.log(response);
      if (response.success) {
        this.queries = response.extras.queries;
        this.allQueries = this.queries;
      }
      else {
        this.showAlert('Oops', response.extras.msg);
      }
    }, error => {
      console.log(error);
      this.showAlert('Oops', 'Unable to login now, please try again...');
    });
  }

  onInput() {
    if (this.searchText == '') {
      this.queries = this.allQueries;
    }
    else {
      this.queries = this.queries.filter(item => {
        return item.query.toLowerCase().indexOf(this.searchText) !== -1 || item.desc.toLowerCase().indexOf(this.searchText) !== -1;
      })
    }
  }

  onCancel() {
    this.searchText = '';
    this.queries = this.allQueries;
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
