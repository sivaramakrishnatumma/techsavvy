import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityProvider } from '../utility/utility';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient, private utility: UtilityProvider) {
    console.log('Hello LoginServiceProvider Provider');
  }

  checkLogin(body){ 
    body['token'] = this.utility.token;
    return new Promise((resolve) => {
      this.http.post(this.utility.baseUrl + '/login', body).subscribe(response => {
        resolve(response);
      })
    });
  }

}
