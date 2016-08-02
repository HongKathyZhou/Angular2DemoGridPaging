"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const patient_detail_component_1 = require('./patient-detail.component');
const patient_service_1 = require('./patient.service');
const router_1 = require('@angular/router');
const orderby_1 = require('./orderby');
let PatientsComponent = class PatientsComponent {
    constructor(router, patientService) {
        this.router = router;
        this.patientService = patientService;
        this.addingPatient = false;
    }
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
    close(savedPatient) {
        this.addingPatient = false;
        if (savedPatient) {
            this.getPatientes();
        }
    }
    deletePatient(patient, event) {
        event.stopPropagation();
        this.patientService
            .delete(patient)
            .then(res => {
            this.patients = this.patients.filter(h => h !== patient);
            if (this.selectedPatient === patient) {
                this.selectedPatient = null;
            }
        })
            .catch(error => this.error = error);
    }
    ngOnInit() {
        this.getPatientes();
    }
    onSelect(patient) {
        this.selectedPatient = patient;
        this.addingPatient = false;
    }
    gotoDetail() {
        this.router.navigate(['/detail', this.selectedPatient.id]);
    }
};
PatientsComponent = __decorate([
    core_1.Component({
        selector: 'my-patients',
        templateUrl: 'app/patients.component.html',
        styleUrls: ['app/css/patients.component.css'],
        directives: [patient_detail_component_1.PatientDetailComponent],
        pipes: [orderby_1.OrderByPipe]
    }), 
    __metadata('design:paramtypes', [router_1.Router, patient_service_1.PatientService])
], PatientsComponent);
exports.PatientsComponent = PatientsComponent;
