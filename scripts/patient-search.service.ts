import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { Patient }           from './patient';

@Injectable()
export class PatientSearchService {

  constructor(private http: Http) {}

  search(term: string) {
    return this.http
               .get(`app/patients/?name=${term}+`)
               .map((r: Response) => r.json().data as Patient[]);
  }
}