import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { PatientSearchService } from './patient-search.service';
import { Patient } from './patient';
@Component({
  selector: 'patient-search',
  templateUrl: 'app/patient-search.component.html',
  providers: [PatientSearchService]
})
export class PatientSearchComponent implements OnInit {
  patients: Observable<Patient[]>;
  searchSubject = new Subject<string>();

  constructor(
    private patientSearchService: PatientSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string) { this.searchSubject.next(term); }

  ngOnInit() {
    this.patients = this.searchSubject
      .asObservable()           // cast as Observable
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.patientSearchService.search(term)
        // or the observable of empty patients if no search term
        : Observable.of<Patient[]>([]))

      .catch(error => {
        // Todo: real error handling
        console.log(error);
        return Observable.of<Patient[]>([]);
      });
  }

  gotoDetail(patient: Patient) {
    let link = ['/detail', patient.id];
    this.router.navigate(link);
  }
}