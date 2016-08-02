import { Component, OnInit } from '@angular/core';
import { Patient } from './patient';
import { PatientDetailComponent } from './patient-detail.component';
import { PatientService } from './patient.service';
import { Router } from '@angular/router';
import {OrderByPipe} from './orderby';

@Component({
  selector: 'my-patients',
   templateUrl: 'app/patients.component.html',
   styleUrls:  ['app/css/patients.component.css'],
   directives: [PatientDetailComponent],
   pipes: [ OrderByPipe ]
})

export class PatientsComponent implements OnInit {
  patients: Patient[];
  selectedPatient: Patient;
  addingPatient = false;
  error: any;

  constructor(
    private router: Router,
    private patientService: PatientService) { }

  getPatientes() {
    this.patientService
        .getPatientes()
        .then(patients => this.patients = patients)
        .catch(error => this.error = error);
  }

  addPatient() {
    this.addingPatient = true;
    this.selectedPatient = null;
  }

  close(savedPatient: Patient) {
    this.addingPatient = false;
    if (savedPatient) { this.getPatientes(); }
  }

  deletePatient(patient: Patient, event: any) {
    event.stopPropagation();
    this.patientService
        .delete(patient)
        .then(res => {
          this.patients = this.patients.filter(h => h !== patient);
          if (this.selectedPatient === patient) { this.selectedPatient = null; }
        })
        .catch(error => this.error = error);
  }

  ngOnInit() {
    this.getPatientes();
  }

  onSelect(patient: Patient) {
    this.selectedPatient = patient;
    this.addingPatient = false;
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedPatient.id]);
  }
}
