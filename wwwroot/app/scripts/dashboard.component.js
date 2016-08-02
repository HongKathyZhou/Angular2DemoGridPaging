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
const patient_service_1 = require('./patient.service');
const patient_search_component_1 = require('./patient-search.component');
const fund_service_1 = require('./fund.service');
const fund_search_component_1 = require('./fund-search.component');
const pagination_component_1 = require('./pagination.component');
const pager_component_1 = require('./pager.component');
let DashboardComponent = class DashboardComponent {
    constructor(router, patientService, fundService) {
        this.router = router;
        this.patientService = patientService;
        this.fundService = fundService;
        this.patients = [];
        this.funds = [];
        //this array contains the image we will show for each page
        this.slides = [];
        //print to the user the selected page
        this.currentSelectedPage = "";
        //print to the user the total iterms per page
        this.currentItemsPerPage = "";
        //the maximum buttons to show
        this.maxSize = 3;
        //the number of pages you want to print
        this.totalResults = 60;
        //the current page
        this.currentPage = 2;
        this.slides.push({ image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg', text: 'BMW 1' }, { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg', text: 'BMW 2' }, { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg', text: 'BMW 3' }, { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car4.jpg', text: 'BMW 4' }, { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car5.jpg', text: 'BMW 5' }, { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car6.jpg', text: 'BMW 6' });
    }
    setCurrentPage(pageNo) {
        this.currentPage = pageNo;
    }
    ;
    currentPageChanged(event) {
        this.currentSelectedPage = ' is : ' + event.page;
        this.currentItemsPerPage = ' is : ' + event.itemsPerPage;
    }
    ;
    ngOnInit() {
        this.patientService.getPatientes()
            .then(patients => this.patients = patients.slice(1, 5));
        this.fundService.getFunds()
            .then(funds => this.funds = funds.slice(1, 5));
    }
    gotoDetail(patient) {
        let link = ['/detail', patient.id];
        this.router.navigate(link);
    }
    gotoFundDetail(fund) {
        let link = ['/funddetail', fund.id];
        this.router.navigate(link);
    }
};
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'my-dashboard',
        templateUrl: 'app/dashboard.component.html',
        styleUrls: ['app/css/dashboard.component.css'],
        directives: [patient_search_component_1.PatientSearchComponent, fund_search_component_1.FundSearchComponent, pagination_component_1.Pagination, pager_component_1.Pager]
    }), 
    __metadata('design:paramtypes', [router_1.Router, patient_service_1.PatientService, fund_service_1.FundService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
