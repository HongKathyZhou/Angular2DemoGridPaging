import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Patient } from './patient';
import { PatientService } from './patient.service';

@Component({
  selector: 'my-patient-detail',
  templateUrl: 'app/patient-detail.component.html',
  styleUrls:  ['app/css/patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  @Input() patient: Patient;
  @Output() close = new EventEmitter();
  error: any;
  sub: any;
  navigated = false; // true if navigated here

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.patientService.getPatient(id)
            .then(patient => this.patient = patient);
      } else {
        this.navigated = false;
        this.patient = new Patient();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.patientService
        .save(this.patient)
        .then(patient => {
          this.patient = patient; // saved patient, w/ id if new
          this.goBack(patient);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  goBack(savedPatient: Patient = null) {
    this.close.emit(savedPatient);
    if (this.navigated) { window.history.back(); }
  }
}