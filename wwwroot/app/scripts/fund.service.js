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
const http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
let FundService = class FundService {
    constructor(http) {
        this.http = http;
        this.fundsUrl = 'app/funds'; // URL to web api
    }
    getFunds() {
        return this.http.get(this.fundsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    getfund(id) {
        return this.getFunds()
            .then(funds => funds.find(fund => fund.id === id));
    }
    save(fund) {
        if (fund.id) {
            return this.put(fund);
        }
        return this.post(fund);
    }
    delete(fund) {
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.fundsUrl}/${fund.id}`;
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }
    // Add new fund
    post(fund) {
        let headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post(this.fundsUrl, JSON.stringify(fund), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    // Update existing fund
    put(fund) {
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        let url = `${this.fundsUrl}/${fund.id}`;
        return this.http
            .put(url, JSON.stringify(fund), { headers: headers })
            .toPromise()
            .then(() => fund)
            .catch(this.handleError);
    }
    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
};
FundService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], FundService);
exports.FundService = FundService;
