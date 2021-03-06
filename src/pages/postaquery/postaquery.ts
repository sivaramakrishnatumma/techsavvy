import { AlertServiceProvider } from './../../providers/alert-service/alert-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PostQueryServiceProvider } from '../../providers/post-query-service/post-query-service';
import { UtilityProvider } from './../../providers/utility/utility';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

/**
 * Generated class for the PostaqueryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postaquery',
  templateUrl: 'postaquery.html',
})
export class PostaqueryPage {
  private user: any;
  private technologies: any = [];
  private postquery: FormGroup;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private postQueryService: PostQueryServiceProvider, private utility: UtilityProvider, private alertCtrl: AlertServiceProvider, private storage: LocalStorageProvider) {
    this.postquery = this.formBuilder.group({ 
      description: ['', Validators.required],
      technology: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostaqueryPage');
    this.storage.getItem('user').then(user => {
      this.user = user;
    });
    this.technologies = [
      'Java',
      'Angular 2',
      'AngularJS',
      'HTML5',
      'CSS3',
      'JavaScript',
      'Typescript',
      'Bootstrap',
      'BackboneJS',
      'ReactJS'
    ];

  }

  postQuery(){
    console.log(this.postquery.value);
    let post = {
      'postBy': this.user.empId,
      'query': this.postquery.value.title,
      'desc': this.postquery.value.description,
      'technologiesInvolved': this.postquery.value.technology,
      'status': 'open',
      'answers': []
    };
    this.postQueryService.postAQuery(post).then(success => {
      this.alertCtrl.showAlert('Success', 'Your query has been posted successfully');
      this.navCtrl.pop();
    }, error => {
      this.alertCtrl.showAlert('Oops', 'Unable to post a query, please try again...');
    })
  }

}
