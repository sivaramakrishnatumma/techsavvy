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
  public baseUrl: string = 'https://tranquil-anchorage-69313.herokuapp.com';
  //public baseUrl: string = 'http://localhost:5000';
  private userData: any;
  public token: any;
  constructor(public http: HttpClient, private localStorage: LocalStorageProvider) {
    console.log('Hello UtilityProvider Provider');
  }

  putUserData(user){
    this.userData = user;
    this.localStorage.setItem('user', user);
  }
  getUserData(){
    return this.userData;
    // this.localStorage.getItem('user').then(user => {
    //   return user;
    // });
  }

  timeDifference(reqTime: any) {
    reqTime = new Date(reqTime);
    const current: any = new Date();
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    let elapsed: any;
    elapsed = current - reqTime;
    if (elapsed < msPerMinute) {
        if (Math.round(elapsed / 1000) < 5) {
            return {time : 'Just Now', show : true };
        } else if (Math.round(elapsed / 1000) <= 59 && Math.round(elapsed / 1000) > 5) {
            return {time : Math.round(elapsed / 1000) + ' Seconds ago', show : true };
        }
    } else if (elapsed < msPerHour) {
        if (Math.round(elapsed / msPerMinute) === 1) {
            return {time : '1 min ago', show : true };
        } else {
            return {time : Math.round(elapsed / msPerMinute) + ' mins ago', show : true };
        }
    } else if (elapsed < msPerDay ) {
        if (Math.round(elapsed / msPerDay) === 1) {
            return { time : Math.round(elapsed / msPerHour ) + ' hour ago', show : true };
        } else {
            return { time : Math.round(elapsed / msPerHour ) + ' hours ago', show : true };
        }
    } else if (elapsed < msPerMonth && Math.round(elapsed / msPerDay) <= 7) {
        if (Math.round(elapsed / msPerDay) === 1) {
            return { time : Math.round(elapsed / msPerDay) + ' day ago', show : true };
        } else {
            return { time : Math.round(elapsed / msPerDay) + ' days ago', show : true };
        }
    } else if (elapsed < msPerYear) {
        if (Math.round(elapsed / msPerMonth) === 1) {
            return { time : reqTime, show : false };
        } else {
            return { time : reqTime, show : false };
        }
    } else {
        if (Math.round(elapsed / msPerYear) === 1) {
            return { time : reqTime, show : false };
        } else {
            return { time : reqTime, show : false };
        }
    }
  }

}
