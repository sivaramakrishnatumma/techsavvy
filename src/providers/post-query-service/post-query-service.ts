import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityProvider } from '../utility/utility';

/*
  Generated class for the PostQueryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostQueryServiceProvider {

  constructor(public http: HttpClient, private utility: UtilityProvider) {
    console.log('Hello PostQueryServiceProvider Provider');
  }

  postAQuery(body){ 
    return new Promise((resolve) => {
      this.http.post(this.utility.baseUrl + '/postquery', body).subscribe(response => {
        resolve(response);
      })
    });
  }

  postReply(query, reply) {
    let body = {query, reply}
    return new Promise((resolve) => {
      this.http.get(this.utility.baseUrl + '/sendNotification').subscribe(response => {
        resolve(response);
      });
      // this.http.put(this.utility.baseUrl + '/postreply', body).subscribe(response => {
      //   resolve(response);
      // });
    })
  }
}
