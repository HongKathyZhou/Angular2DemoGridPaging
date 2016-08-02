import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Patient } from './patient';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PatientService {
  private patientsUrl = 'app/patients';  // URL to web api

  constructor(private http: Http) { }

  getPatientes() {
    return this.http.get(this.patientsUrl)
               .toPromise()
               .then(response => response.json().data as Patient[])
               .catch(this.handleError);
  }

  getPatient(id: number) {
    return this.getPatientes()
                .then(patients => patients.find(patient => patient.id === id));
  }
  
  save(patient: Patient): Promise<Patient>  {
    if (patient.id) {
      return this.put(patient);
    }
    return this.post(patient);
  }

  delete(patient: Patient) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.patientsUrl}/${patient.id}`;

    return this.http
               .delete(url, {headers: headers})
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Patient
  private post(patient: Patient): Promise<Patient> {
    let headers = new Headers({
      'Content-Type': 'application/json'});

    return this.http
               .post(this.patientsUrl, JSON.stringify(patient), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Patient
  private put(patient: Patient) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.patientsUrl}/${patient.id}`;

    return this.http
               .put(url, JSON.stringify(patient), {headers: headers})
               .toPromise()
               .then(() => patient)
               .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}