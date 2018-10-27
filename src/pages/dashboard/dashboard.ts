import { MyqueriesPage } from './../myqueries/myqueries';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { PostaqueryPage } from '../postaquery/postaquery';
import { AnsweraqueryPage } from '../answeraquery/answeraquery';
import { SearchPage } from '../search/search';
import { ChatwithexpertPage } from '../chatwithexpert/chatwithexpert';
import { MycreditsPage } from '../mycredits/mycredits';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.viewCtrl.showBackButton(false);
  }

  openMenu() {
    this.menuCtrl.open();
  }

  public cardTapped(card){
    switch(card){
      case 'postAQuery': this.navCtrl.push(PostaqueryPage); break;
      case 'answerAQuery': this.navCtrl.push(AnsweraqueryPage); break;
      case 'search': this.navCtrl.push(SearchPage); break;
      case 'myQueries': this.navCtrl.push(MyqueriesPage); break;
      case 'chatWithAnExpert': this.navCtrl.push(ChatwithexpertPage); break;
      case 'myCredits': this.navCtrl.push(MycreditsPage); break;
    }
  }

}
