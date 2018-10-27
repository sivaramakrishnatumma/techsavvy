import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadqueriesProvider } from '../../providers/loadqueries/loadqueries';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadqueriesProvider: LoadqueriesProvider, private alertCtrl: AlertServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.loadQueries();
  }

  loadQueries() {
    this.loadqueriesProvider.getQueries().then((response: any) => {
      
      if (response.success) {
        this.queries = response.extras.queries;
        this.allQueries = this.queries;
      }
      else {
        this.alertCtrl.showAlert('Oops', response.extras.msg);
      }
    }, error => {
      console.log(error);
      this.alertCtrl.showAlert('Oops', 'Unable to login now, please try again...');
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
}
