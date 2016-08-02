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
const router_1 = require('@angular/router');
const patient_1 = require('./patient');
const patient_service_1 = require('./patient.service');
let PatientDetailComponent = class PatientDetailComponent {
    constructor(patientService, route) {
        this.patientService = patientService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.patientService.getPatient(id)
                    .then(patient => this.patient = patient);
            }
            else {
                this.navigated = false;
                this.patient = new patient_1.Patient();
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
    goBack(savedPatient = null) {
        this.close.emit(savedPatient);
        if (this.navigated) {
            window.history.back();
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', patient_1.Patient)
], PatientDetailComponent.prototype, "patient", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], PatientDetailComponent.prototype, "close", void 0);
PatientDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-patient-detail',
        templateUrl: 'app/patient-detail.component.html',
        styleUrls: ['app/css/patient-detail.component.css']
    }), 
    __metadata('design:paramtypes', [patient_service_1.PatientService, router_1.ActivatedRoute])
], PatientDetailComponent);
exports.PatientDetailComponent = PatientDetailComponent;
