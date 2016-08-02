import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Fund }           from './fund';

@Injectable()
export class FundSearchService {

  constructor(private http: Http) {}

  search(term: string) {
    return this.http
               .get(`app/funds/?name=${term}+`)
               .map((r: Response) => r.json().data as Fund[]);
  }
}