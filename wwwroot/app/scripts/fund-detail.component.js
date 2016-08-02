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
const fund_1 = require('./fund');
const fund_service_1 = require('./fund.service');
let FundDetailComponent = class FundDetailComponent {
    constructor(fundService, route) {
        this.fundService = fundService;
        this.route = route;
        this.close = new core_1.EventEmitter();
        this.navigated = false; // true if navigated here
    }
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                this.fundService.getfund(id)
                    .then(fund => this.fund = fund);
            }
            else {
                this.navigated = false;
                this.fund = new fund_1.Fund();
            }
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    save() {
        this.fundService
            .save(this.fund)
            .then(fund => {
            this.fund = fund; // saved patient, w/ id if new
            this.goBack(fund);
        })
            .catch(error => this.error = error); // TODO: Display error message
    }
    goBack(savedFund = null) {
        this.close.emit(savedFund);
        if (this.navigated) {
            window.history.back();
        }
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', fund_1.Fund)
], FundDetailComponent.prototype, "fund", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], FundDetailComponent.prototype, "close", void 0);
FundDetailComponent = __decorate([
    core_1.Component({
        selector: 'my-fund-detail',
        templateUrl: 'app/fund-detail.component.html',
        styleUrls: ['app/css/fund-detail.component.css']
    }), 
    __metadata('design:paramtypes', [fund_service_1.FundService, router_1.ActivatedRoute])
], FundDetailComponent);
exports.FundDetailComponent = FundDetailComponent;
