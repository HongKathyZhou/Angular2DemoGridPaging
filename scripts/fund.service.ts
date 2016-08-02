import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Fund } from './fund';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FundService {
  private fundsUrl = 'app/funds';  // URL to web api

  constructor(private http: Http) { }

  getFunds() {
    return this.http.get(this.fundsUrl)
               .toPromise()
               .then(response => response.json().data as Fund[])
               .catch(this.handleError);
  }

  getfund(id: number) {
    return this.getFunds()
                .then(funds => funds.find(fund => fund.id === id));
    }
  save(fund: Fund): Promise<Fund>  {
    if (fund.id) {
      return this.put(fund);
    }
    return this.post(fund);
  }

  delete(fund: Fund) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.fundsUrl}/${fund.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new fund
  private post(fund: Fund): Promise<Fund> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.fundsUrl, JSON.stringify(fund), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing fund
  private put(fund: Fund) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.fundsUrl}/${fund.id}`;

    return this.http
               .put(url, JSON.stringify(fund), {headers: headers})
               .toPromise()
               .then(() => fund)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}