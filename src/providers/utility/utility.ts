import { LocalStorageProvider } from './../local-storage/local-storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {
  //public baseUrl: string = 'https://tranquil-anchorage-69313.herokuapp.com';
  public baseUrl: string = 'http://localhost:5000';
  private userData: any;
  constructor(public http: HttpClient, private localStorage: LocalStorageProvider) {
    console.log('Hello UtilityProvider Provider');
  }

  putUserData(user){
    this.userData = user;
    // this.localStorage.setItem('user', user);
  }
  getUserData(){
    return this.userData;
    // this.localStorage.getItem('user').then(user => {
    //   return user;
    // });
  }

}
