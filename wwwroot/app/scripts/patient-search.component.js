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
const Observable_1 = require('rxjs/Observable');
const Subject_1 = require('rxjs/Subject');
const patient_search_service_1 = require('./patient-search.service');
let PatientSearchComponent = class PatientSearchComponent {
    constructor(patientSearchService, router) {
        this.patientSearchService = patientSearchService;
        this.router = router;
        this.searchSubject = new Subject_1.Subject();
    }
    // Push a search term into the observable stream.
    search(term) { this.searchSubject.next(term); }
    ngOnInit() {
        this.patients = this.searchSubject
            .asObservable() // cast as Observable
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(term => term // switch to new observable each time
            ? this.patientSearchService.search(term)
            : Observable_1.Observable.of([]))
            .catch(error => {
            // Todo: real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    }
    gotoDetail(patient) {
        let link = ['/detail', patient.id];
        this.router.navigate(link);
    }
};
PatientSearchComponent = __decorate([
    core_1.Component({
        selector: 'patient-search',
        templateUrl: 'app/patient-search.component.html',
        providers: [patient_search_service_1.PatientSearchService]
    }), 
    __metadata('design:paramtypes', [patient_search_service_1.PatientSearchService, router_1.Router])
], PatientSearchComponent);
exports.PatientSearchComponent = PatientSearchComponent;
