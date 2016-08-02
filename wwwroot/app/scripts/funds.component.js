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
const fund_detail_component_1 = require('./fund-detail.component');
const fund_service_1 = require('./fund.service');
const router_1 = require('@angular/router');
const orderby_1 = require('./orderby');
const pagination_component_1 = require('./pagination.component');
const pager_component_1 = require('./pager.component');
let FundsComponent = class FundsComponent {
    constructor(router, fundService) {
        this.router = router;
        this.fundService = fundService;
        this.addingFund = false;
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
    getFunds() {
        this.fundService
            .getFunds()
            .then(funds => this.funds = funds)
            .catch(error => this.error = error);
    }
    addFund() {
        this.addingFund = true;
        this.selectedFund = null;
    }
    close(savedFund) {
        this.addingFund = false;
        if (savedFund) {
            this.getFunds();
        }
    }
    deleteFund(fund, event) {
        event.stopPropagation();
        this.fundService
            .delete(fund)
            .then(res => {
            this.funds = this.funds.filter(f => f !== fund);
            if (this.selectedFund === fund) {
                this.selectedFund = null;
            }
        })
            .catch(error => this.error = error);
    }
    ngOnInit() {
        this.getFunds();
    }
    onSelect(fund) {
        this.selectedFund = fund;
        this.addingFund = false;
    }
    gotoFundDetail() {
        this.router.navigate(['/funddetail', this.selectedFund.id]);
    }
};
FundsComponent = __decorate([
    core_1.Component({
        selector: 'my-funds',
        templateUrl: 'app/funds.component.html',
        styleUrls: ['app/css/funds.component.css'],
        directives: [fund_detail_component_1.FundDetailComponent, pagination_component_1.Pagination, pager_component_1.Pager],
        pipes: [orderby_1.OrderByPipe]
    }), 
    __metadata('design:paramtypes', [router_1.Router, fund_service_1.FundService])
], FundsComponent);
exports.FundsComponent = FundsComponent;
