import { UtilityProvider } from './../utility/utility';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsersServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersServiceProvider {

  constructor(public http: HttpClient, private utility: UtilityProvider) {
    console.log('Hello UsersServiceProvider Provider');
  }

  getAllUsers() {
    return new Promise((resolve) => {
      this.http.get(this.utility.baseUrl + '/users').subscribe(response => {
        resolve(response);
      })
    });
  }
}
