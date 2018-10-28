import { PostQueryServiceProvider } from './../../providers/post-query-service/post-query-service';
import { LocalStorageProvider } from './../../providers/local-storage/local-storage';
import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadqueriesProvider } from '../../providers/loadqueries/loadqueries';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { UtilityProvider } from '../../providers/utility/utility';

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
  private user: any;
  private queries: any = [];
  private allQueries: any = [];
  private searchText: string = '';
  private comment: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadqueriesProvider: LoadqueriesProvider, private alertCtrl: AlertServiceProvider, public menuCtrl:MenuController, public utility: UtilityProvider, private storage: LocalStorageProvider, private postAQuery: PostQueryServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.storage.getItem('user').then(user => {
      this.user = user;
      this.loadQueries();
    });
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
        let exists = false
        item.technologiesInvolved.forEach(tech => {
          if(tech.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) !== -1)
          exists = true;  
        });
        if((item.desc && item.desc.toLowerCase().indexOf(this.searchText) !== -1))
          exists = true;  
        return exists;
      })
    }
  }

  onCancel() {
    this.searchText = '';
    this.queries = this.allQueries;
  }
  openMenu() {
    this.menuCtrl.open();
  }
  commentAdded(item){
    this.postAQuery.postReply(item, {
      'commentedBy': this.user.name,
      'comment': this.comment
    }).then((response:any) => {
      if(response.success) {
        item.isCommentOpen = false;
        item.answers.push({
          'commentedBy': this.user.name,
          'comment': this.comment
        });
        this.comment = '';
      } else {
        this.alertCtrl.showAlert('Oops...', 'Failed to add comment...')
      }
    })
  }
  getTimeDiff(time){
    return this.utility.timeDifference(time).time;
  }
  postQuery(){
    this.navCtrl.push('PostaqueryPage');
  }
}
