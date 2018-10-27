import { UtilityProvider } from './../utility/utility';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LoadqueriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadqueriesProvider {

  constructor(public http: HttpClient, private utility: UtilityProvider) {
    console.log('Hello LoadqueriesProvider Provider');
  }

  getQueries(){ 
    return new Promise((resolve) => {
      this.http.get(this.utility.baseUrl + '/aiequeries').subscribe(response => {
        resolve(response);
      })
    });
  }
}
