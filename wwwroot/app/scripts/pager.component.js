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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const pagination_component_1 = require('./pagination.component');
const pagerConfig = {
    itemsPerPage: 10,
    previousText: '« Previous',
    nextText: 'Next »',
    align: true
};
const PAGER_TEMPLATE = `
    <ul class="pager">
      <li [class.disabled]="noPrevious()" [class.previous]="align" [ngClass]="{'pull-right': align}">
        <a href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a>
      </li>
      <li [class.disabled]="noNext()" [class.next]="align" [ngClass]="{'pull-right': align}">
        <a href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a>
      </li>
  </ul>
`;
let Pager = class Pager extends pagination_component_1.Pagination {
    constructor(cd, renderer, elementRef) {
        super(cd, renderer, elementRef);
        this.config = pagerConfig;
    }
};
Pager = __decorate([
    core_1.Component({
        selector: 'pager[ngModel]',
        template: PAGER_TEMPLATE,
        directives: [common_1.NgClass],
        inputs: [
            'align',
            'totalItems', 'itemsPerPage',
            'previousText', 'nextText',
        ]
    }),
    __param(0, core_1.Self()), 
    __metadata('design:paramtypes', [common_1.NgModel, core_1.Renderer, core_1.ElementRef])
], Pager);
exports.Pager = Pager;
